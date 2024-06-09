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

// Services
export interface QuorumCheckerSrvDef {
    check: (results: { error: string; success: boolean; value: string; }[], minResults: number, callParams: ParticleContext$$) => { error: string; success: boolean; value: string; } | Promise<{ error: string; success: boolean; value: string; }>;
}
export function registerQuorumCheckerSrv(service: QuorumCheckerSrvDef): void;
export function registerQuorumCheckerSrv(serviceId: string, service: QuorumCheckerSrvDef): void;
export function registerQuorumCheckerSrv(peer: IFluenceClient$$, service: QuorumCheckerSrvDef): void;
export function registerQuorumCheckerSrv(peer: IFluenceClient$$, serviceId: string, service: QuorumCheckerSrvDef): void;

