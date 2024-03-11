/**
 * Copyright 2023 Fluence Labs Limited
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import { FLUENCE_ENV, RPC_PROVIDERS } from "./env";
import {
  startGateway,
  fluence,
  subnet,
  backupFile,
  randomElement,
} from "./utils";
import { updateConfig } from "./config";

function throwError(msg: string): never {
  throw new Error(msg);
}

/**
 * Start gateway and test requests to it
 * @param mode mode to start gateway in
 * @param times how many times to send request
 */
async function testGateway(mode?: string, times = 6) {
  const gateway = await startGateway(mode);
  try {
    for (let i = 0; i < times; ++i) {
      const id = 100 + i;
      const request = {
        jsonrpc: "2.0",
        method: "eth_blockNumber",
        params: [],
        id,
      };
      const response = await gateway.request(request);
      expect(response).toMatchObject({
        jsonrpc: "2.0",
        id,
        result: expect.any(String),
      });
    }
  } finally {
    expect(gateway.stop()).toBeTruthy();
  }
}

/**
 * Run fluence CLI with env and private key
 */
async function fluenceEnv(...args: string[]) {
  return fluence(
    ...args,
    "--env",
    FLUENCE_ENV,
  );
}

/**
 * WARNING: This tests are not isolated
 *          They modify fs state
 */
describe("fRPC", () => {
  /**
   * - Setup RPC providers
   */
  beforeAll(async () => {
    await updateConfig({
      providers: RPC_PROVIDERS,
    });
  });

  describe("quickstart", () => {
    [undefined, "random", "round-robin", "quorum"].forEach((mode) => {
      it(`should run ${mode ? `(mode: ${mode})` : ""}`, async () => {
        await testGateway(mode);
      });
    });
  });

  /**
   * WARNING: This tests should be run in order
   *          As gateway tests need to have deal deployed
   */
  describe("deploy", () => {
    /**
     * - Setup relay
     * - Register provider and add peers only for local env
     */
    beforeAll(async () => {
      const [getPeers, stderrPeers] = await fluence(
        "default",
        "peers",
        FLUENCE_ENV,
      );

      const peers = getPeers
        .split("\n")
        .map((p) => p.trim())
        .filter((p) => p.length > 0);

      if (peers.length === 0) {
        throw new Error(`Failed to get default peers:
        stdout: ${getPeers}
        stderr: ${stderrPeers}`);
      }

      const relay = randomElement(peers) ?? throwError("Empty peers");

      await updateConfig({ relay });
    });

    it("should deploy the deal", async () => {
      // Remove previous deployment info
      await backupFile(".fluence/workers.yaml");

      const [stdout, stderr] = await fluenceEnv(
        "deploy",
        "fRPC-deployment"
      );

      expect(stdout.includes("Success!")).toBeTruthy();

      const workersMatch = stderr.match(/(\d+)\s*workers/);
      const workers =
        workersMatch?.[1] ?? throwError(`Failed to parse workers.`);
      const workersNum = parseInt(workers);

      expect(workersNum).toBeGreaterThanOrEqual(3);

      /**
       * Wait for workers to deploy
       */
      const DEPLOY_TIMEOUT = 60_000;
      const deadline = Date.now() + DEPLOY_TIMEOUT;
      for (;;) {
        const workers = await subnet(FLUENCE_ENV);
        const deployed = workers.filter(
          (w) => w.worker_id !== undefined && w.services?.includes("eth_rpc"),
        );
        if (deployed.length === workersNum) {
          break;
        }
        if (Date.now() > deadline) {
          throw new Error(
            `Deployment timeout: ${workersNum} workers expected, 
            ${deployed.length} deployed.
            workers: ${JSON.stringify(workers)}
            `,
          );
        }
      }
    });

    ["random", "round-robin", "quorum"].forEach((mode) => {
      it(`should run ${mode ? `(mode: ${mode})` : ""}`, async () => {
        await testGateway(mode);
      });
    });
  });
});
