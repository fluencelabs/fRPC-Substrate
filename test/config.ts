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

export const CONFIG_PATH = "./gateway/configs/quickstart_config.json";

/**
 * Part of the config that is used for the integration tests.
 */
export interface GatewayConfig {
  providers: string[];
  port: number;
  mode: string;
}

export async function readConfig(): Promise<GatewayConfig> {
  const file = await fs.readFile(CONFIG_PATH);
  return JSON.parse(file.toString());
}

export async function updateConfig(
  update: Partial<GatewayConfig>
): Promise<void> {
  const current = await readConfig();
  const newConfig = { ...current, ...update };
  await fs.writeFile(CONFIG_PATH, JSON.stringify(newConfig, null, 2));
}
