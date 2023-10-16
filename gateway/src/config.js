import fs from "fs";

export const configHelp =
  "Config structure: { port, relay, serviceId, providers, mode, counterServiceId?, counterPeerId?}\n" +
  "Where 'mode' can be: 'random' (default), 'round-robin' or 'quorum',\n" +
  "'counterServiceId' and 'counterPeerId' will use local service if undefined.\n";
("'quorumServiceId' and 'quorumPeerId' will use local service if undefined.\n");

export function readConfig(path) {
  const rawdata = fs.readFileSync(path);
  const config = JSON.parse(rawdata);

  let errors = [];
  if (!config.port) {
    errors.push("Specify port ('port') in config");
  }
  if (!config.relay) {
    errors.push("Specify Fluence peer address ('relay') in config");
  }
  if (
    !!config.mode &&
    !["random", "round-robin", "quorum"].includes(config.mode)
  ) {
    errors.push(
      `Incorrect mode '${config.mode}' in config. Should be 'random', 'round-robin' or 'quorum'`
    );
  }

  return {
    config,
    errors,
    help: configHelp,
  };
}
