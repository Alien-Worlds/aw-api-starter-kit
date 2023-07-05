import { ConfigVars } from '@alien-worlds/api-core';
import { PSC_API_Config, NewRelicConfig } from './config.types';

import { readFileSync } from 'fs';
import { MongoConfig, buildMongoConfig } from '@alien-worlds/storage-mongodb';

export const buildConfig = (packageJsonPath: string): PSC_API_Config => {
  const vars = new ConfigVars();
  const port = vars.getNumberEnv('API_PORT');
  const mongo: MongoConfig = buildMongoConfig(vars);

  const newRelic: NewRelicConfig = {
    newRelicEnabled: vars.getBooleanEnv('NEW_RELIC_ENABLED'),
    appName: vars.getStringEnv('NEW_RELIC_APP_NAME') || `${process.env.npm_package_name}`,
    licenseKey: vars.getStringEnv('NEW_RELIC_LICENSE_KEY'),
  };

  const packageJson = JSON.parse(readFileSync(packageJsonPath, 'utf-8'));
  const major = Number(packageJson.version.split('.')[0]);
  const urlVersion = major < 2 ? `v1` : `v${major}`;

  const versions = {
    api: packageJson.version,
    urlVersion: urlVersion,
    apiCore: packageJson.dependencies['@alien-worlds/api-core'],
    storageMongoDB: packageJson.dependencies['@alien-worlds/storage-mongodb'],
    express: packageJson.dependencies['express'],
    newRelic: packageJson.dependencies['newrelic'],
  };

  return {
    versions,
    port,
    mongo,
    newRelic,
  };
};
