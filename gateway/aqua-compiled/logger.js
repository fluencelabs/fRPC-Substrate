/* eslint-disable */
// @ts-nocheck
/**
 *
 * This file is generated using:
 * @fluencelabs/aqua-api version: 0.13.0
 * @fluencelabs/aqua-to-js version: 0.3.13
 * If you find any bugs in generated AIR, please write an issue on GitHub: https://github.com/fluencelabs/aqua/issues
 * If you find any bugs in generated JS/TS, please write an issue on GitHub: https://github.com/fluencelabs/js-client/issues
 *
 */


// Making aliases to reduce chance of accidental name collision
import {
    v5_callFunction as callFunction$$,
    v5_registerService as registerService$$
} from '@fluencelabs/js-client';

// Services

export function registerLoggerSrv(...args) {
    registerService$$(
        args,
        {
    "defaultServiceId": "logger",
    "functions": {
        "fields": {
            "logCall": {
                "domain": {
                    "fields": {
                        "s": {
                            "name": "string",
                            "tag": "scalar"
                        }
                    },
                    "tag": "labeledProduct"
                },
                "codomain": {
                    "tag": "nil"
                },
                "tag": "arrow"
            },
            "logWorker": {
                "domain": {
                    "fields": {
                        "w": {
                            "name": "Worker",
                            "fields": {
                                "host_id": {
                                    "name": "string",
                                    "tag": "scalar"
                                },
                                "pat_id": {
                                    "name": "string",
                                    "tag": "scalar"
                                },
                                "worker_id": {
                                    "type": {
                                        "name": "string",
                                        "tag": "scalar"
                                    },
                                    "tag": "option"
                                }
                            },
                            "tag": "struct"
                        }
                    },
                    "tag": "labeledProduct"
                },
                "codomain": {
                    "tag": "nil"
                },
                "tag": "arrow"
            }
        },
        "tag": "labeledProduct"
    }
}
    );
}


