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

import { promises as fs } from "fs";

import { startGateway, fluence } from "./utils";
import { CHAIN_PRIVATE_KEY } from "./consts";

async function testGateway(mode?: string) {
  const gateway = await startGateway(mode);
  try {
    for (let i = 0; i < 6; ++i) {
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

describe("fRPC", () => {
  describe("quickstart", () => {
    [undefined, "random", "round-robin", "quorum"].forEach((mode) => {
      it(`should run ${mode ? `(mode: ${mode})` : ""}`, async () => {
        await testGateway(mode);
      });
    });
  });

  describe("deploy", () => {
    it("should deploy the deal", async () => {
      await fs.rename(".fluence/workers.yaml", ".fluence/workers.yaml.bak");

      const [stdout, _] = await fluence(
        "deal",
        "deploy",
        "--priv-key",
        CHAIN_PRIVATE_KEY,
      );

      console.log(stdout);

      expect(stdout.includes("Success!")).toBeTruthy();
    });

    [undefined, "random", "round-robin", "quorum"].forEach((mode) => {
      it(`should run ${mode ? `(mode: ${mode})` : ""}`, async () => {
        await testGateway(mode);
      });
    });
  });
});
