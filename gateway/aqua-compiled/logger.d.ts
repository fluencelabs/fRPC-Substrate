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
export interface LoggerSrvDef {
    logCall: (s: string, callParams: ParticleContext$$) => void | Promise<void>;
    logWorker: (w: { host_id: string; pat_id: string; worker_id: string | null; }, callParams: ParticleContext$$) => void | Promise<void>;
}
export function registerLoggerSrv(service: LoggerSrvDef): void;
export function registerLoggerSrv(serviceId: string, service: LoggerSrvDef): void;
export function registerLoggerSrv(peer: IFluenceClient$$, service: LoggerSrvDef): void;
export function registerLoggerSrv(peer: IFluenceClient$$, serviceId: string, service: LoggerSrvDef): void;

