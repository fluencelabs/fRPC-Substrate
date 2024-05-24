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

export function registerQuorumCheckerSrv(...args) {
    registerService$$(
        args,
        {
    "defaultServiceId": "quorum",
    "functions": {
        "fields": {
            "check": {
                "domain": {
                    "fields": {
                        "results": {
                            "type": {
                                "name": "JsonString",
                                "fields": {
                                    "error": {
                                        "name": "string",
                                        "tag": "scalar"
                                    },
                                    "success": {
                                        "name": "bool",
                                        "tag": "scalar"
                                    },
                                    "value": {
                                        "name": "string",
                                        "tag": "scalar"
                                    }
                                },
                                "tag": "struct"
                            },
                            "tag": "array"
                        },
                        "minResults": {
                            "name": "u32",
                            "tag": "scalar"
                        }
                    },
                    "tag": "labeledProduct"
                },
                "codomain": {
                    "items": [
                        {
                            "name": "JsonString",
                            "fields": {
                                "error": {
                                    "name": "string",
                                    "tag": "scalar"
                                },
                                "success": {
                                    "name": "bool",
                                    "tag": "scalar"
                                },
                                "value": {
                                    "name": "string",
                                    "tag": "scalar"
                                }
                            },
                            "tag": "struct"
                        }
                    ],
                    "tag": "unlabeledProduct"
                },
                "tag": "arrow"
            }
        },
        "tag": "labeledProduct"
    }
}
    );
}


