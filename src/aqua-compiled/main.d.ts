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
export type HelloWorldRemoteParams = [name: string, config?: {ttl?: number}] | [peer: IFluenceClient$$, name: string, config?: {ttl?: number}];

export type HelloWorldRemoteResult = Promise<string>;

export type HelloWorldParams = [name: string, config?: {ttl?: number}] | [peer: IFluenceClient$$, name: string, config?: {ttl?: number}];

export type HelloWorldResult = Promise<string>;

export type GetInfoResultType = [{ node_version: string; spell_version: string; external_addresses: string[]; allowed_binaries: string[]; air_version: string; }, string]

export type GetInfoParams = [config?: {ttl?: number}] | [peer: IFluenceClient$$, config?: {ttl?: number}];

export type GetInfoResult = Promise<GetInfoResultType>;

export type GetInfosParams = [peers: string[], config?: {ttl?: number}] | [peer: IFluenceClient$$, peers: string[], config?: {ttl?: number}];

export type GetInfosResult = Promise<{ node_version: string; spell_version: string; external_addresses: string[]; allowed_binaries: string[]; air_version: string; }[]>;

