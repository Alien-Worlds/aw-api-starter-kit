export * from './api-config';
export * from './config.types';
/* eslint-disable @typescript-eslint/no-var-requires */
import { existsSync, statSync } from 'fs';

import PSC_API_Config from './api-config';

const envPath = process.env.ENVIRONMENT ? `./.env-${process.env.ENVIRONMENT}` : `./.env`;

if (!existsSync(envPath)) {
  throw new Error(`Configuration file not found. Please check path: ${envPath}`);
}

const envStats = statSync(envPath);

if (!envStats.isFile()) {
  throw new Error(`The given path is not a file. Please check path: ${envPath}`);
}

export const config = PSC_API_Config.create(envPath, `${process.cwd()}/package.json`);
export { Config } from './config.types';
