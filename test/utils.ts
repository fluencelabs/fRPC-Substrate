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

import { relative } from "path";
import { execFile, ChildProcess } from "child_process";

import treeKill from "tree-kill";

import { CONFIG_PATH, readConfig } from "./config";

export async function execute(
  cmd: string,
  ...args: string[]
): Promise<[string, string]> {
  return new Promise((resolve, reject) => {
    execFile(cmd, args, (error, stdout, stderr) => {
      if (error) {
        reject(error);
      }

      resolve([stdout, stderr]);
    });
  });
}

export async function fluence(...args: string[]): Promise<[string, string]> {
  return execute("fluence", ...args);
}

export class Gateway {
  constructor(
    private readonly gateway: ChildProcess,
    private readonly port: number,
  ) {}

  public async stop(): Promise<boolean> {
    console.log(this.gateway.pid);
    if (this.gateway.stdin) {
      this.gateway.stdin.end();
    }
    if (this.gateway.stdout) {
      this.gateway.stdout.destroy();
    }
    if (this.gateway.stderr) {
      this.gateway.stderr.destroy();
    }
    if (this.gateway.pid) {
      const pid = this.gateway.pid;
      await new Promise<void>((resolve, reject) =>
        treeKill(pid, (err) => {
          if (err) {
            reject(err);
          } else {
            resolve();
          }
        }),
      );
    }
    return this.gateway.kill();
  }

  public async request(json: any): Promise<any> {
    const response = await fetch(`http://localhost:${this.port}`, {
      method: "POST",
      body: JSON.stringify(json),
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    });

    return await response.json();
  }
}

export async function startGateway(): Promise<Gateway> {
  const GATEWAY_DIR = "./gateway";
  const configPath = relative(GATEWAY_DIR, CONFIG_PATH);

  const config = await readConfig();
  const gateway = execFile("npm", [
    "-C",
    GATEWAY_DIR,
    "run",
    "run",
    configPath,
  ]);

  // Hack: wait till gateway is ready
  await new Promise((resolve) => setTimeout(resolve, 5000));

  return new Gateway(gateway, config.port);
}
