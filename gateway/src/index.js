#!/usr/bin/env node

"use strict";

import express from "express";
import bodyParser from "body-parser";
import { JSONRPCServer } from "json-rpc-2.0";
import { Fluence } from '@fluencelabs/js-client';
import {
    quorumEth,
    randomLoadBalancingEth,
    registerCounter,
    registerLogger,
    registerQuorumChecker,
    roundRobinEth
} from "../aqua-compiled/rpc.js";
import { readArguments } from "./arguments.js";
import { readConfig } from "./config.js";
import { methods } from "./methods.js";

const args = readArguments(process.argv.slice(2));

if (args.errors.length > 0) {
    console.log(args.help);
    args.errors.forEach((err) => console.log(err));
    process.exit(1);
}

const { config, errors, help } = readConfig(args.configPath);

if (errors.length > 0) {
    errors.forEach((err) => console.log(err));
    console.log(help);
    process.exit(1);
}

console.log("Running server...");

const route = "/";

const server = new JSONRPCServer();

// initialize fluence client
await Fluence.connect(config.relay);
const peerId = (await Fluence.getClient()).getPeerId()

// handler for logger
registerLogger({
    log: s => {
        console.log("log: " + s);
    },
    logCall: s => {
        console.log("Call will be to : " + s);
    },
    logWorker: s => {
        console.log("Worker used: " + JSON.stringify(s));
    },
    logNum: s => {
        console.log("Number: " + s);
    },
})

let counter = 0;
registerCounter("counter", {
    incrementAndReturn: () => {
        counter++;
        console.log("Counter: " + counter)
        return counter;
    }
})

function findSameResults(results, minNum) {
    const resultCounts = results.filter((obj) => obj.success).map((obj) => obj.value).reduce(function (i, v) {
        if (i[v] === undefined) {
            i[v] = 1
        } else {
            i[v] = i[v] + 1;
        }
        return i;
    }, {});

    const getMaxRepeated = Math.max(...Object.values(resultCounts));
    if (getMaxRepeated >= minNum) {
        console.log(resultCounts)
        const max = Object.entries(resultCounts).find((kv) => kv[1] === getMaxRepeated)
        return {
            value: max[0],
            results: [],
            error: ""
        }
    } else {
        return {
            error: "No consensus in results",
            results: results,
            value: ""
        }
    }
}

registerQuorumChecker("quorum",
    {
        check: (ethResults, minQuorum) => {
            console.log("Check quorum for:")
            console.log(ethResults)
            return findSameResults(ethResults, minQuorum)
        }
    }
)

const counterServiceId = config.counterServiceId || 'counter'
const counterPeerId = config.counterPeerId || peerId
const quorumServiceId = config.quorumServiceId || 'quorum'
const quorumPeerId = config.quorumPeerId || peerId
const quorumNumber = config.quorumNumber || 2

async function methodHandler(reqRaw, method) {
    const req = reqRaw.map((s) => JSON.stringify(s))
    console.log(`Receiving request '${method}'`);
    let result;
    if (!config.mode || config.mode === "random") {
        result = await randomLoadBalancingEth(config.providers, method, req);
    } else if (config.mode === "round-robin") {
        result = await roundRobinEth(config.providers, method, req, counterServiceId, counterPeerId, config.serviceId);
    } else if (config.mode === "quorum") {
        const quorumResult = await quorumEth(config.providers, quorumNumber, 10000, method, req, quorumServiceId, quorumPeerId, { ttl: 20000 });

        if (quorumResult.error) {
            console.error(`quorum failed: ${quorumResult.error}\n${JSON.stringify(quorumResult.results)}`);
            result = { success: false, error: quorumResult.error };
        } else {
            result = { success: true, error: quorumResult.error, value: quorumResult.value };
        }
    }

    if (!result.success) {
        throw new Error(result.error);
    }

    return JSON.parse(result.value || '{}');
}

function addMethod(op) {
    server.addMethod(op, async (req) => methodHandler(req, op));
}

// register all eth methods
methods.forEach((m) => {
    addMethod(m);
})

const app = express();
app.use(bodyParser.json());

// register JSON-RPC handler
app.post(route, (req, res) => {
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