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

import { startGateway, fluence, backupFile } from "./utils";
import { CHAIN_PRIVATE_KEY, LOCAL_PEER_IDS, FLUENCE_ENV } from "./consts";

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

async function fluenceKeyEnv(...args: string[]) {
  return fluence(
    ...args,
    "--env",
    FLUENCE_ENV,
    "--priv-key",
    CHAIN_PRIVATE_KEY,
  );
}

describe("fRPC", () => {
  describe("quickstart", () => {
    [undefined, "random", "round-robin", "quorum"].forEach((mode) => {
      it(`should run ${mode ? `(mode: ${mode})` : ""}`, async () => {
        await testGateway(mode);
      });
    });
  });

  describe.only("deploy", () => {
    beforeAll(async () => {
      const [register, stderrReg] = await fluenceKeyEnv("provider", "register");

      // Here CLI writes success to stdout
      if (!register.includes("Successfully")) {
        throw new Error(`Failed to register provider:
        stdout: ${register}
        stderr: ${stderrReg}`);
      }

      const [stdoutAdd, addPeers] = await fluenceKeyEnv(
        "provider",
        "add-peer",
        ...LOCAL_PEER_IDS.flatMap((id) => ["--peer-id", id]),
        "--units",
        "1",
      );

      // Here CLI writes results to stderr
      const added = addPeers.match(/Added/g)?.length ?? 0;
      if (added != 3) {
        throw new Error(`Failed to add peers:
        stdout: ${stdoutAdd}
        stderr: ${addPeers}`);
      }
    });

    it("should deploy the deal", async () => {
      await backupFile(".fluence/workers.yaml");

      const [stdout, _] = await fluenceKeyEnv("deal", "deploy");

      expect(stdout.includes("Success!")).toBeTruthy();

      // Wait until workers are deployed
      // TODO: Make this gracefully,
      // call aqua subnet resolution
      await new Promise((resolve) => setTimeout(resolve, 10000));
    });

    ["random", "round-robin", "quorum"].forEach((mode) => {
      it(`should run ${mode ? `(mode: ${mode})` : ""}`, async () => {
        await testGateway(mode);
      });
    });
  });
});
