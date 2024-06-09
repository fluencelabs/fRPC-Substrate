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


// Functions
export const roundRobinEth_script = `
(xor
 (new $result
  (seq
   (seq
    (seq
     (seq
      (seq
       (seq
        (seq
         (seq
          (seq
           (seq
            (seq
             (seq
              (seq
               (seq
                (call %init_peer_id% ("getDataSrv" "-relay-") [] -relay-)
                (call %init_peer_id% ("getDataSrv" "uris") [] -uris-arg-)
               )
               (call %init_peer_id% ("getDataSrv" "method") [] -method-arg-)
              )
              (call %init_peer_id% ("getDataSrv" "jsonArgs") [] -jsonArgs-arg-)
             )
             (call %init_peer_id% ("getDataSrv" "counterServiceId") [] -counterServiceId-arg-)
            )
            (call %init_peer_id% ("getDataSrv" "counterPeerId") [] -counterPeerId-arg-)
           )
           (xor
            (seq
             (seq
              (new $option-inline
               (seq
                (xor
                 (seq
                  (new %MyDeployment_obj_map
                   (seq
                    (seq
                     (seq
                      (seq
                       (seq
                        (seq
                         (ap ("chainNetworkId" 2358716091832359) %MyDeployment_obj_map)
                         (ap ("dealId" "76e56472bf60f11ab791d922c41d523e0954b81f") %MyDeployment_obj_map)
                        )
                        (ap ("dealIdOriginal" "0x76E56472bf60f11aB791d922c41d523E0954B81F") %MyDeployment_obj_map)
                       )
                       (ap ("definition" "bafkreidvdwopj7kxjpw56uh42rz7wvsjiilv5ft7vzuk3fspz73y7q5kou") %MyDeployment_obj_map)
                      )
                      (ap ("matched" true) %MyDeployment_obj_map)
                     )
                     (ap ("timestamp" "2024-05-24T22:25:20.628Z") %MyDeployment_obj_map)
                    )
                    (canon %init_peer_id% %MyDeployment_obj_map  MyDeployment_obj)
                   )
                  )
                  (ap MyDeployment_obj $option-inline)
                 )
                 (null)
                )
                (canon %init_peer_id% $option-inline  #option-inline-0)
               )
              )
              (new %Deals_obj_map
               (seq
                (seq
                 (ap ("fRpcDeployment" []) %Deals_obj_map)
                 (ap ("myDeployment" #option-inline-0) %Deals_obj_map)
                )
                (canon %init_peer_id% %Deals_obj_map  Deals_obj)
               )
              )
             )
             (new $-hop-
              (new #-hopc-
               (canon -relay- $-hop-  #-hopc-)
              )
             )
            )
            (fail :error:)
           )
          )
          (ap Deals_obj.$.fRpcDeployment Deals_obj_flat)
         )
         (ap Deals_obj_flat.$.[0].dealIdOriginal Deals_obj_flat_flat)
        )
        (xor
         (call -relay- ("subnet" "resolve") [Deals_obj_flat_flat] ret)
         (fail :error:)
        )
       )
       (ap ret.$.workers ret_flat)
      )
      (ap ret.$.error ret_flat-0)
     )
     (new -if-else-error-
      (new -else-error-
       (new -if-error-
        (xor
         (mismatch ret_flat-0 []
          (seq
           (new %JsonString_obj_map
            (seq
             (seq
              (seq
               (ap ("error" ret_flat-0.$.[0]) %JsonString_obj_map)
               (ap ("success" false) %JsonString_obj_map)
              )
              (ap ("value" "") %JsonString_obj_map)
             )
             (canon %init_peer_id% %JsonString_obj_map  JsonString_obj)
            )
           )
           (ap JsonString_obj $result)
          )
         )
         (seq
          (ap :error: -if-error-)
          (xor
           (match :error:.$.error_code 10002
            (seq
             (xor
              (seq
               (seq
                (seq
                 (seq
                  (seq
                   (seq
                    (seq
                     (new $-hop-
                      (new #-hopc-
                       (canon -relay- $-hop-  #-hopc-)
                      )
                     )
                     (xor
                      (call -counterPeerId-arg- (-counterServiceId-arg- "incrementAndReturn") [] ret-0)
                      (fail :error:)
                     )
                    )
                    (ap ret_flat ret_flat_to_functor)
                   )
                   (ap ret_flat_to_functor.length ret_flat_length)
                  )
                  (call -relay- ("math" "rem") [ret-0 ret_flat_length] rem)
                 )
                 (xor
                  (seq
                   (call %init_peer_id% ("logger" "logWorker") [ret_flat.$.[rem]])
                   (new $-hop-
                    (new #-hopc-
                     (canon -relay- $-hop-  #-hopc-)
                    )
                   )
                  )
                  (fail :error:)
                 )
                )
                (xor
                 (seq
                  (call %init_peer_id% ("logger" "logCall") [-uris-arg-.$.[rem]])
                  (new $-hop-
                   (new #-hopc-
                    (canon -relay- $-hop-  #-hopc-)
                   )
                  )
                 )
                 (fail :error:)
                )
               )
               (xor
                (seq
                 (seq
                  (seq
                   (new $-hop-
                    (new #-hopc-
                     (canon ret_flat.$.[rem].host_id $-hop-  #-hopc-)
                    )
                   )
                   (call ret_flat.$.[rem].worker_id.[0] ("eth_rpc" "eth_call") [-uris-arg-.$.[rem] -method-arg- -jsonArgs-arg-] ret-1)
                  )
                  (new $-hop-
                   (new #-hopc-
                    (canon ret_flat.$.[rem].host_id $-hop-  #-hopc-)
                   )
                  )
                 )
                 (new $-hop-
                  (new #-hopc-
                   (canon -relay- $-hop-  #-hopc-)
                  )
                 )
                )
                (seq
                 (seq
                  (new $-hop-
                   (new #-hopc-
                    (canon ret_flat.$.[rem].host_id $-hop-  #-hopc-)
                   )
                  )
                  (new $-hop-
                   (new #-hopc-
                    (canon -relay- $-hop-  #-hopc-)
                   )
                  )
                 )
                 (fail :error:)
                )
               )
              )
              (fail :error:)
             )
             (ap ret-1 $result)
            )
           )
           (seq
            (seq
             (ap :error: -else-error-)
             (xor
              (match :error:.$.error_code 10001
               (ap -if-error- -if-else-error-)
              )
              (ap -else-error- -if-else-error-)
             )
            )
            (fail -if-else-error-)
           )
          )
         )
        )
       )
      )
     )
    )
    (new $result_test
     (seq
      (seq
       (fold $result result_fold_var
        (seq
         (seq
          (ap result_fold_var $result_test)
          (canon %init_peer_id% $result_test  #result_iter_canon)
         )
         (xor
          (match #result_iter_canon.length 1
           (null)
          )
          (next result_fold_var)
         )
        )
        (never)
       )
       (canon %init_peer_id% $result_test  #result_result_canon)
      )
      (ap #result_result_canon result_gate)
     )
    )
   )
   (call %init_peer_id% ("callbackSrv" "response") [result_gate.$.[0]])
  )
 )
 (call %init_peer_id% ("errorHandlingSrv" "error") [:error: 0])
)
`;


export function roundRobinEth(...args) {
    return callFunction$$(
        args,
        {
    "functionName": "roundRobinEth",
    "arrow": {
        "domain": {
            "fields": {
                "uris": {
                    "type": {
                        "name": "string",
                        "tag": "scalar"
                    },
                    "tag": "array"
                },
                "method": {
                    "name": "string",
                    "tag": "scalar"
                },
                "jsonArgs": {
                    "type": {
                        "name": "string",
                        "tag": "scalar"
                    },
                    "tag": "array"
                },
                "counterServiceId": {
                    "name": "string",
                    "tag": "scalar"
                },
                "counterPeerId": {
                    "name": "string",
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
    },
    "names": {
        "relay": "-relay-",
        "getDataSrv": "getDataSrv",
        "callbackSrv": "callbackSrv",
        "responseSrv": "callbackSrv",
        "responseFnName": "response",
        "errorHandlingSrv": "errorHandlingSrv",
        "errorFnName": "error"
    }
},
        roundRobinEth_script
    );
}

export const quorumEth_script = `
(xor
 (new $result
  (seq
   (seq
    (seq
     (seq
      (seq
       (seq
        (seq
         (seq
          (seq
           (seq
            (seq
             (seq
              (seq
               (seq
                (seq
                 (seq
                  (call %init_peer_id% ("getDataSrv" "-relay-") [] -relay-)
                  (call %init_peer_id% ("getDataSrv" "uris") [] -uris-arg-)
                 )
                 (call %init_peer_id% ("getDataSrv" "quorumNumber") [] -quorumNumber-arg-)
                )
                (call %init_peer_id% ("getDataSrv" "timeout") [] -timeout-arg-)
               )
               (call %init_peer_id% ("getDataSrv" "method") [] -method-arg-)
              )
              (call %init_peer_id% ("getDataSrv" "jsonArgs") [] -jsonArgs-arg-)
             )
             (call %init_peer_id% ("getDataSrv" "quorumServiceId") [] -quorumServiceId-arg-)
            )
            (call %init_peer_id% ("getDataSrv" "quorumPeerId") [] -quorumPeerId-arg-)
           )
           (xor
            (seq
             (seq
              (new $option-inline
               (seq
                (xor
                 (seq
                  (new %MyDeployment_obj_map
                   (seq
                    (seq
                     (seq
                      (seq
                       (seq
                        (seq
                         (ap ("chainNetworkId" 2358716091832359) %MyDeployment_obj_map)
                         (ap ("dealId" "76e56472bf60f11ab791d922c41d523e0954b81f") %MyDeployment_obj_map)
                        )
                        (ap ("dealIdOriginal" "0x76E56472bf60f11aB791d922c41d523E0954B81F") %MyDeployment_obj_map)
                       )
                       (ap ("definition" "bafkreidvdwopj7kxjpw56uh42rz7wvsjiilv5ft7vzuk3fspz73y7q5kou") %MyDeployment_obj_map)
                      )
                      (ap ("matched" true) %MyDeployment_obj_map)
                     )
                     (ap ("timestamp" "2024-05-24T22:25:20.628Z") %MyDeployment_obj_map)
                    )
                    (canon %init_peer_id% %MyDeployment_obj_map  MyDeployment_obj)
                   )
                  )
                  (ap MyDeployment_obj $option-inline)
                 )
                 (null)
                )
                (canon %init_peer_id% $option-inline  #option-inline-0)
               )
              )
              (new %Deals_obj_map
               (seq
                (seq
                 (ap ("fRpcDeployment" []) %Deals_obj_map)
                 (ap ("myDeployment" #option-inline-0) %Deals_obj_map)
                )
                (canon %init_peer_id% %Deals_obj_map  Deals_obj)
               )
              )
             )
             (new $-hop-
              (new #-hopc-
               (canon -relay- $-hop-  #-hopc-)
              )
             )
            )
            (fail :error:)
           )
          )
          (ap Deals_obj.$.fRpcDeployment Deals_obj_flat)
         )
         (ap Deals_obj_flat.$.[0].dealIdOriginal Deals_obj_flat_flat)
        )
        (xor
         (call -relay- ("subnet" "resolve") [Deals_obj_flat_flat] ret)
         (fail :error:)
        )
       )
       (ap ret.$.workers ret_flat)
      )
      (ap ret.$.error ret_flat-0)
     )
     (new -if-else-error-
      (new -else-error-
       (new -if-error-
        (xor
         (mismatch ret_flat-0 []
          (seq
           (new %JsonString_obj_map
            (seq
             (seq
              (seq
               (ap ("error" ret_flat-0.$.[0]) %JsonString_obj_map)
               (ap ("success" false) %JsonString_obj_map)
              )
              (ap ("value" "") %JsonString_obj_map)
             )
             (canon %init_peer_id% %JsonString_obj_map  JsonString_obj)
            )
           )
           (ap JsonString_obj $result)
          )
         )
         (seq
          (ap :error: -if-error-)
          (xor
           (match :error:.$.error_code 10002
            (new $results
             (seq
              (seq
               (seq
                (seq
                 (xor
                  (par
                   (fold ret_flat worker-0
                    (par
                     (seq
                      (seq
                       (seq
                        (seq
                         (seq
                          (seq
                           (seq
                            (seq
                             (call -relay- ("peer" "timestamp_sec") [] ret-0)
                             (call -relay- ("op" "identity") [ret-0] ret-1)
                            )
                            (ap -uris-arg- -uris-arg-_to_functor)
                           )
                           (ap -uris-arg-_to_functor.length -uris-arg-_length)
                          )
                          (call -relay- ("math" "rem") [ret-1 -uris-arg-_length] rem)
                         )
                         (xor
                          (seq
                           (seq
                            (seq
                             (new $-hop-
                              (new #-hopc-
                               (canon worker-0.$.host_id $-hop-  #-hopc-)
                              )
                             )
                             (call worker-0.$.worker_id.[0] ("eth_rpc" "eth_call") [-uris-arg-.$.[rem] -method-arg- -jsonArgs-arg-] ret-2)
                            )
                            (new $-hop-
                             (new #-hopc-
                              (canon worker-0.$.host_id $-hop-  #-hopc-)
                             )
                            )
                           )
                           (new $-hop-
                            (new #-hopc-
                             (canon -relay- $-hop-  #-hopc-)
                            )
                           )
                          )
                          (seq
                           (seq
                            (new $-hop-
                             (new #-hopc-
                              (canon worker-0.$.host_id $-hop-  #-hopc-)
                             )
                            )
                            (new $-hop-
                             (new #-hopc-
                              (canon -relay- $-hop-  #-hopc-)
                             )
                            )
                           )
                           (fail :error:)
                          )
                         )
                        )
                        (ap ret-2 $results)
                       )
                       (new $-hop-
                        (new #-hopc-
                         (canon -relay- $-hop-  #-hopc-)
                        )
                       )
                      )
                      (new $-hop-
                       (new #-hopc-
                        (canon %init_peer_id% $-hop-  #-hopc-)
                       )
                      )
                     )
                     (next worker-0)
                    )
                    (never)
                   )
                   (null)
                  )
                  (fail :error:)
                 )
                 (par
                  (seq
                   (seq
                    (seq
                     (ap ret_flat ret_flat_to_functor)
                     (ap ret_flat_to_functor.length ret_flat_length)
                    )
                    (new $results_test
                     (seq
                      (seq
                       (fold $results results_fold_var
                        (seq
                         (seq
                          (ap results_fold_var $results_test)
                          (canon %init_peer_id% $results_test  #results_iter_canon)
                         )
                         (xor
                          (match #results_iter_canon.length ret_flat_length
                           (null)
                          )
                          (next results_fold_var)
                         )
                        )
                        (never)
                       )
                       (canon %init_peer_id% $results_test  #results_result_canon)
                      )
                      (ap #results_result_canon results_gate)
                     )
                    )
                   )
                   (call %init_peer_id% ("math" "sub") [ret_flat_length 1] results_idx)
                  )
                  (call %init_peer_id% ("peer" "timeout") [-timeout-arg- "Workers timeout"] ret-3)
                 )
                )
                (canon %init_peer_id% $results  #results_canon)
               )
               (xor
                (seq
                 (seq
                  (new $-hop-
                   (new #-hopc-
                    (canon -relay- $-hop-  #-hopc-)
                   )
                  )
                  (call -quorumPeerId-arg- (-quorumServiceId-arg- "check") [#results_canon -quorumNumber-arg-] ret-4)
                 )
                 (new $-hop-
                  (new #-hopc-
                   (canon -relay- $-hop-  #-hopc-)
                  )
                 )
                )
                (seq
                 (seq
                  (new $-hop-
                   (new #-hopc-
                    (canon -relay- $-hop-  #-hopc-)
                   )
                  )
                  (new $-hop-
                   (new #-hopc-
                    (canon %init_peer_id% $-hop-  #-hopc-)
                   )
                  )
                 )
                 (fail :error:)
                )
               )
              )
              (ap ret-4 $result)
             )
            )
           )
           (seq
            (seq
             (ap :error: -else-error-)
             (xor
              (match :error:.$.error_code 10001
               (ap -if-error- -if-else-error-)
              )
              (ap -else-error- -if-else-error-)
             )
            )
            (fail -if-else-error-)
           )
          )
         )
        )
       )
      )
     )
    )
    (new $result_test
     (seq
      (seq
       (fold $result result_fold_var
        (seq
         (seq
          (ap result_fold_var $result_test)
          (canon %init_peer_id% $result_test  #result_iter_canon)
         )
         (xor
          (match #result_iter_canon.length 1
           (null)
          )
          (next result_fold_var)
         )
        )
        (never)
       )
       (canon %init_peer_id% $result_test  #result_result_canon)
      )
      (ap #result_result_canon result_gate)
     )
    )
   )
   (call %init_peer_id% ("callbackSrv" "response") [result_gate.$.[0]])
  )
 )
 (call %init_peer_id% ("errorHandlingSrv" "error") [:error: 0])
)
`;


export function quorumEth(...args) {
    return callFunction$$(
        args,
        {
    "functionName": "quorumEth",
    "arrow": {
        "domain": {
            "fields": {
                "uris": {
                    "type": {
                        "name": "string",
                        "tag": "scalar"
                    },
                    "tag": "array"
                },
                "quorumNumber": {
                    "name": "u32",
                    "tag": "scalar"
                },
                "timeout": {
                    "name": "u32",
                    "tag": "scalar"
                },
                "method": {
                    "name": "string",
                    "tag": "scalar"
                },
                "jsonArgs": {
                    "type": {
                        "name": "string",
                        "tag": "scalar"
                    },
                    "tag": "array"
                },
                "quorumServiceId": {
                    "name": "string",
                    "tag": "scalar"
                },
                "quorumPeerId": {
                    "name": "string",
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
    },
    "names": {
        "relay": "-relay-",
        "getDataSrv": "getDataSrv",
        "callbackSrv": "callbackSrv",
        "responseSrv": "callbackSrv",
        "responseFnName": "response",
        "errorHandlingSrv": "errorHandlingSrv",
        "errorFnName": "error"
    }
},
        quorumEth_script
    );
}

export const randomLoadBalancingEth_script = `
(xor
 (new $result
  (seq
   (seq
    (seq
     (seq
      (seq
       (seq
        (seq
         (seq
          (seq
           (seq
            (seq
             (seq
              (call %init_peer_id% ("getDataSrv" "-relay-") [] -relay-)
              (call %init_peer_id% ("getDataSrv" "uris") [] -uris-arg-)
             )
             (call %init_peer_id% ("getDataSrv" "method") [] -method-arg-)
            )
            (call %init_peer_id% ("getDataSrv" "jsonArgs") [] -jsonArgs-arg-)
           )
           (xor
            (seq
             (seq
              (new $option-inline
               (seq
                (xor
                 (seq
                  (new %MyDeployment_obj_map
                   (seq
                    (seq
                     (seq
                      (seq
                       (seq
                        (seq
                         (ap ("chainNetworkId" 2358716091832359) %MyDeployment_obj_map)
                         (ap ("dealId" "76e56472bf60f11ab791d922c41d523e0954b81f") %MyDeployment_obj_map)
                        )
                        (ap ("dealIdOriginal" "0x76E56472bf60f11aB791d922c41d523E0954B81F") %MyDeployment_obj_map)
                       )
                       (ap ("definition" "bafkreidvdwopj7kxjpw56uh42rz7wvsjiilv5ft7vzuk3fspz73y7q5kou") %MyDeployment_obj_map)
                      )
                      (ap ("matched" true) %MyDeployment_obj_map)
                     )
                     (ap ("timestamp" "2024-05-24T22:25:20.628Z") %MyDeployment_obj_map)
                    )
                    (canon %init_peer_id% %MyDeployment_obj_map  MyDeployment_obj)
                   )
                  )
                  (ap MyDeployment_obj $option-inline)
                 )
                 (null)
                )
                (canon %init_peer_id% $option-inline  #option-inline-0)
               )
              )
              (new %Deals_obj_map
               (seq
                (seq
                 (ap ("fRpcDeployment" []) %Deals_obj_map)
                 (ap ("myDeployment" #option-inline-0) %Deals_obj_map)
                )
                (canon %init_peer_id% %Deals_obj_map  Deals_obj)
               )
              )
             )
             (new $-hop-
              (new #-hopc-
               (canon -relay- $-hop-  #-hopc-)
              )
             )
            )
            (fail :error:)
           )
          )
          (ap Deals_obj.$.fRpcDeployment Deals_obj_flat)
         )
         (ap Deals_obj_flat.$.[0].dealIdOriginal Deals_obj_flat_flat)
        )
        (xor
         (call -relay- ("subnet" "resolve") [Deals_obj_flat_flat] ret)
         (fail :error:)
        )
       )
       (ap ret.$.workers ret_flat)
      )
      (ap ret.$.error ret_flat-0)
     )
     (new -if-else-error-
      (new -else-error-
       (new -if-error-
        (xor
         (mismatch ret_flat-0 []
          (seq
           (new %JsonString_obj_map
            (seq
             (seq
              (seq
               (ap ("error" ret_flat-0.$.[0]) %JsonString_obj_map)
               (ap ("success" false) %JsonString_obj_map)
              )
              (ap ("value" "") %JsonString_obj_map)
             )
             (canon %init_peer_id% %JsonString_obj_map  JsonString_obj)
            )
           )
           (ap JsonString_obj $result)
          )
         )
         (seq
          (ap :error: -if-error-)
          (xor
           (match :error:.$.error_code 10002
            (seq
             (xor
              (seq
               (seq
                (seq
                 (seq
                  (seq
                   (seq
                    (seq
                     (seq
                      (seq
                       (seq
                        (seq
                         (seq
                          (call -relay- ("peer" "timestamp_sec") [] ret-0)
                          (call -relay- ("op" "identity") [ret-0] ret-1)
                         )
                         (ap ret_flat ret_flat_to_functor)
                        )
                        (ap ret_flat_to_functor.length ret_flat_length)
                       )
                       (call -relay- ("math" "rem") [ret-1 ret_flat_length] rem)
                      )
                      (call -relay- ("peer" "timestamp_sec") [] ret-2)
                     )
                     (call -relay- ("op" "identity") [ret-2] ret-3)
                    )
                    (ap -uris-arg- -uris-arg-_to_functor)
                   )
                   (ap -uris-arg-_to_functor.length -uris-arg-_length)
                  )
                  (call -relay- ("math" "rem") [ret-3 -uris-arg-_length] rem-0)
                 )
                 (xor
                  (seq
                   (call %init_peer_id% ("logger" "logWorker") [ret_flat.$.[rem]])
                   (new $-hop-
                    (new #-hopc-
                     (canon -relay- $-hop-  #-hopc-)
                    )
                   )
                  )
                  (fail :error:)
                 )
                )
                (xor
                 (seq
                  (call %init_peer_id% ("logger" "logCall") [-uris-arg-.$.[rem-0]])
                  (new $-hop-
                   (new #-hopc-
                    (canon -relay- $-hop-  #-hopc-)
                   )
                  )
                 )
                 (fail :error:)
                )
               )
               (xor
                (seq
                 (seq
                  (seq
                   (new $-hop-
                    (new #-hopc-
                     (canon ret_flat.$.[rem].host_id $-hop-  #-hopc-)
                    )
                   )
                   (call ret_flat.$.[rem].worker_id.[0] ("eth_rpc" "eth_call") [-uris-arg-.$.[rem-0] -method-arg- -jsonArgs-arg-] ret-4)
                  )
                  (new $-hop-
                   (new #-hopc-
                    (canon ret_flat.$.[rem].host_id $-hop-  #-hopc-)
                   )
                  )
                 )
                 (new $-hop-
                  (new #-hopc-
                   (canon -relay- $-hop-  #-hopc-)
                  )
                 )
                )
                (seq
                 (seq
                  (new $-hop-
                   (new #-hopc-
                    (canon ret_flat.$.[rem].host_id $-hop-  #-hopc-)
                   )
                  )
                  (new $-hop-
                   (new #-hopc-
                    (canon -relay- $-hop-  #-hopc-)
                   )
                  )
                 )
                 (fail :error:)
                )
               )
              )
              (fail :error:)
             )
             (ap ret-4 $result)
            )
           )
           (seq
            (seq
             (ap :error: -else-error-)
             (xor
              (match :error:.$.error_code 10001
               (ap -if-error- -if-else-error-)
              )
              (ap -else-error- -if-else-error-)
             )
            )
            (fail -if-else-error-)
           )
          )
         )
        )
       )
      )
     )
    )
    (new $result_test
     (seq
      (seq
       (fold $result result_fold_var
        (seq
         (seq
          (ap result_fold_var $result_test)
          (canon %init_peer_id% $result_test  #result_iter_canon)
         )
         (xor
          (match #result_iter_canon.length 1
           (null)
          )
          (next result_fold_var)
         )
        )
        (never)
       )
       (canon %init_peer_id% $result_test  #result_result_canon)
      )
      (ap #result_result_canon result_gate)
     )
    )
   )
   (call %init_peer_id% ("callbackSrv" "response") [result_gate.$.[0]])
  )
 )
 (call %init_peer_id% ("errorHandlingSrv" "error") [:error: 0])
)
`;


export function randomLoadBalancingEth(...args) {
    return callFunction$$(
        args,
        {
    "functionName": "randomLoadBalancingEth",
    "arrow": {
        "domain": {
            "fields": {
                "uris": {
                    "type": {
                        "name": "string",
                        "tag": "scalar"
                    },
                    "tag": "array"
                },
                "method": {
                    "name": "string",
                    "tag": "scalar"
                },
                "jsonArgs": {
                    "type": {
                        "name": "string",
                        "tag": "scalar"
                    },
                    "tag": "array"
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
    },
    "names": {
        "relay": "-relay-",
        "getDataSrv": "getDataSrv",
        "callbackSrv": "callbackSrv",
        "responseSrv": "callbackSrv",
        "responseFnName": "response",
        "errorHandlingSrv": "errorHandlingSrv",
        "errorFnName": "error"
    }
},
        randomLoadBalancingEth_script
    );
}
