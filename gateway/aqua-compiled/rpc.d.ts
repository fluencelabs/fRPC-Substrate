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
import type { IFluenceClient as IFluenceClient$$, ParticleContext as ParticleContext$$ } from '@fluencelabs/js-client';

// Making aliases to reduce chance of accidental name collision
import {
    v5_callFunction as callFunction$$,
    v5_registerService as registerService$$
} from '@fluencelabs/js-client';


// Functions
export type RoundRobinEthResultType = { error: string; success: boolean; value: string; }

export type RoundRobinEthParams = [uris: string[], method: string, jsonArgs: string[], counterServiceId: string, counterPeerId: string, config?: {ttl?: number}] | [peer: IFluenceClient$$, uris: string[], method: string, jsonArgs: string[], counterServiceId: string, counterPeerId: string, config?: {ttl?: number}];

export type RoundRobinEthResult = Promise<RoundRobinEthResultType>;

export type QuorumEthResultType = { error: string; success: boolean; value: string; }

export type QuorumEthParams = [uris: string[], quorumNumber: number, timeout: number, method: string, jsonArgs: string[], quorumServiceId: string, quorumPeerId: string, config?: {ttl?: number}] | [peer: IFluenceClient$$, uris: string[], quorumNumber: number, timeout: number, method: string, jsonArgs: string[], quorumServiceId: string, quorumPeerId: string, config?: {ttl?: number}];

export type QuorumEthResult = Promise<QuorumEthResultType>;

export type RandomLoadBalancingEthResultType = { error: string; success: boolean; value: string; }

export type RandomLoadBalancingEthParams = [uris: string[], method: string, jsonArgs: string[], config?: {ttl?: number}] | [peer: IFluenceClient$$, uris: string[], method: string, jsonArgs: string[], config?: {ttl?: number}];

export type RandomLoadBalancingEthResult = Promise<RandomLoadBalancingEthResultType>;

