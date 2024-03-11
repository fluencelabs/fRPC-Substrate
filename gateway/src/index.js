#!/usr/bin/env node

"use strict";

import express from "express";
import bodyParser from "body-parser";
import { JSONRPCServer } from "json-rpc-2.0";

import { Fluence } from "@fluencelabs/js-client";

import { readArguments } from "./arguments.js";
import { readConfig } from "./config.js";
import { methods } from "./methods.js";
import { resultsQuorum } from "./utils.js";

import {
    quorumEth,
    randomLoadBalancingEth,
    roundRobinEth,
} from "../aqua-compiled/rpc.js";
import { registerLoggerSrv } from "../aqua-compiled/logger.js";
import { registerCounterSrv } from "../aqua-compiled/counter.js";
import { registerQuorumCheckerSrv } from "../aqua-compiled/quorum.js";

// read arguments
const args = readArguments(process.argv.slice(2));

if (args.errors.length > 0) {
    console.log(args.help);
    args.errors.forEach((err) => console.log(err));
    process.exit(1);
}

// read config
const { config, errors, help } = readConfig(args.configPath);

if (errors.length > 0) {
    errors.forEach((err) => console.log(err));
    console.log(help);
    process.exit(1);
}

console.log("Running server...");

// initialize fluence client
await Fluence.connect(config.relay, {});
const client = Fluence.getClient();
const peerId = client.getPeerId();

// Register logger service
registerLoggerSrv({
    logCall: (s) => {
        console.log("Call will be to : " + s);
    },
    logWorker: (s) => {
        console.log("Worker used: " + JSON.stringify(s));
    }
});

// Register counter service
let counter = 0;
registerCounterSrv("counter", {
    incrementAndReturn: () => {
        counter++;
        console.log("Increment counter to:", counter);
        return counter;
    },
});

// Register quorum checker service
registerQuorumCheckerSrv("quorum", {
    check: (ethResults, minQuorum) => {
        console.log("Check quorum for:", ethResults);
        return resultsQuorum(ethResults, minQuorum);
    },
});

const counterServiceId = config.counterServiceId || "counter";
const counterPeerId = config.counterPeerId || peerId;
const quorumServiceId = config.quorumServiceId || "quorum";
const quorumPeerId = config.quorumPeerId || peerId;
const quorumNumber = config.quorumNumber || 2;
const mode = config.mode || "random";

console.log(`Using mode '${mode}'`);

async function methodHandler(reqRaw, method) {
    const req = reqRaw.map((s) => JSON.stringify(s));
    console.log(`Handling request '${method}'`);
    let result;
    if (mode === "random") {
        result = await randomLoadBalancingEth(
            config.providers,
            method,
            req,
            { ttl: 20000 }
        );
    } else if (mode === "round-robin") {
        result = await roundRobinEth(
            config.providers,
            method,
            req,
            counterServiceId,
            counterPeerId,
            config.serviceId,
            { ttl: 20000 },
        );
    } else if (mode === "quorum") {
        result = await quorumEth(
            config.providers,
            quorumNumber,
            10000,
            method,
            req,
            quorumServiceId,
            quorumPeerId,
            { ttl: 20000 },
        );
    }

    if (!result.success) {
        throw new Error(result.error);
    }

    return JSON.parse(result.value || "{}");
}

const server = new JSONRPCServer();

// Register all eth methods
methods.forEach((m) => {
    server.addMethod(m, async (req) => methodHandler(req, m));
});

const app = express();
app.use(bodyParser.json());

// Register JSON-RPC handler
app.post("/", (req, res) => {
    const jsonRPCRequest = req.body;
    server.receive(jsonRPCRequest).then((jsonRPCResponse) => {
        if (jsonRPCResponse) {
            res.json(jsonRPCResponse);
        } else {
            res.sendStatus(204);
        }
    });
});

app.listen(config.port);

console.log("Server was started on port " + config.port);
