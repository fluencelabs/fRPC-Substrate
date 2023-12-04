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
import { promises as fs } from "fs";
import { ChildProcess, execFile } from "child_process";

import treeKill from "tree-kill";

import { CONFIG_PATH, readConfig, updateConfig } from "./config";

export async function backupFile(path: string): Promise<void> {
  await fs.rename(path, `${path}.back`).catch((err) => {
    if (err.code !== "ENOENT") {
      throw err;
    }
  });
}

export async function execute(
  cmd: string,
  ...args: string[]
): Promise<[string, string]> {
  console.error(`Executing ${cmd} ${args.map((a) => '"' + a + '"').join(" ")}`);
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
  return execute("fluence", ...args, "--no-input");
}

interface Worker {
  host_id: string;
  worker_id: string | undefined;
  services: string[] | undefined;
}

/**
 * Run `showSubnet` function and return workers
 * @param env Fluence environment
 * @returns Subnet workers
 */
export async function subnet(env: string): Promise<Worker[]> {
  const [stdout, _] = await fluence(
    "run",
    "-f",
    "showSubnet()",
    "-i",
    "src/aqua/main.aqua",
    "--env",
    env,
  );

  return JSON.parse(stdout);
}

export class Gateway {
  private stdout: string = "";
  private stderr: string = "";

  constructor(
    private readonly gateway: ChildProcess,
    private readonly port: number,
  ) {
    gateway.stdout?.on("data", (data: any) => {
      this.stdout += data;
    });
    gateway.stderr?.on("data", (data: any) => {
      this.stderr += data;
    });
  }

  public async stop(): Promise<boolean> {
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
      /**
       * For some reason JS is not able
       * to properly kill subprocess tree
       */
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

  public getStdout(): string {
    return this.stdout;
  }
  public getStderr(): string {
    return this.stderr;
  }
}

export async function startGateway(mode?: string): Promise<Gateway> {
  const GATEWAY_DIR = "./gateway";
  const configPath = relative(GATEWAY_DIR, CONFIG_PATH);

  const config = await (mode ? updateConfig({ mode }) : readConfig());
  const gateway = execFile("npm", [
    "-C",
    GATEWAY_DIR,
    "run",
    "run",
    configPath,
  ]);

  const wrapper = new Gateway(gateway, config.port);

  await new Promise<void>((resolve, reject) => {
    const timeout = setTimeout(() => {
      gateway.stdout?.removeListener("data", onData);
      gateway.stderr?.removeListener("data", onData);
      wrapper.stop();
      reject(new Error(`Gateway failed to start in 10 seconds: ${output}`));
    }, 10000);

    let output = "";
    const onData = (data: string) => {
      output += data;
      if (output.includes("Server was started")) {
        gateway.stdout?.removeListener("data", onData);
        gateway.stderr?.removeListener("data", onData);
        clearTimeout(timeout);
        resolve();
      }
    };

    gateway.stdout?.on("data", onData);
    gateway.stderr?.on("data", onData);
  });

  return wrapper;
}

export function randomElement<T>(arr: T[]): T | undefined {
  return arr[Math.floor(Math.random() * arr.length)];
}
