/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  DocsConfig,
  Environment,
  NewRelicConfig,
  PackagedDependencyJsonModel,
} from './config.types';

import { MongoConfig } from '@alien-worlds/aw-storage-mongodb';
import { readEnvFile } from './config.utils';
import { readFileSync } from 'fs';

export default class PSC_API_Config {
  public static Token = 'CNC_API_CONFIG';

  public static create(envPath: string, packageJsonPath: string): PSC_API_Config {
    const environment: Environment = { ...process.env } as Environment;
    const dotEnv = readEnvFile(envPath);
    const packageJsonContent = readFileSync(packageJsonPath, 'utf-8');
    const packageJson = packageJsonContent ? JSON.parse(packageJsonContent) : {};

    const name = packageJson.name || '';
    const dependencies = packageJson.dependencies || {};
    const version = packageJson.version;
    const env = environment.ENVIRONMENT || dotEnv.ENVIRONMENT;
    const host = environment.HOST || dotEnv.HOST;
    const port = Number(environment.PORT || dotEnv.PORT);

    const docs: DocsConfig = {
      host: environment.DOCS_HOST || dotEnv.DOCS_HOST,
      routePrefix: environment.DOCS_ROUTE_PREFIX || dotEnv.DOCS_ROUTE_PREFIX,
      exposeRoute: Boolean(environment.DOCS_EXPOSE_ROUTE || dotEnv.DOCS_EXPOSE_ROUTE),
    };

    const mongo: MongoConfig = {
      hosts: (environment.MONGO_HOSTS || dotEnv.MONGO_HOSTS).split(/,\s*/),
      ports: (environment.MONGO_PORTS || dotEnv.MONGO_PORTS).split(/,\s*/),
      database: environment.MONGO_DB_NAME || dotEnv.MONGO_DB_NAME,
      user: environment.MONGO_USER || dotEnv.MONGO_USER,
      password: environment.MONGO_PASSWORD || dotEnv.MONGO_PASSWORD,
      srv: Boolean(Number(environment.MONGO_SRV || dotEnv.MONGO_SRV)),
      ssl: Boolean(Number(environment.MONGO_SSL || dotEnv.MONGO_SSL)),
      replicaSet: environment.MONGO_REPLICA_SET || dotEnv.MONGO_REPLICA_SET,
      authMechanism: environment.MONGO_AUTH_MECHANISM || dotEnv.MONGO_AUTH_MECHANISM,
      authSource: environment.MONGO_AUTH_SOURCE || dotEnv.MONGO_AUTH_SOURCE,
    };

    const newRelic: NewRelicConfig = {
      newRelicEnabled: Boolean(environment.NEW_RELIC_ENABLED || dotEnv.NEW_RELIC_ENABLED),
      appName:
        environment.NEW_RELIC_APP_NAME ||
        dotEnv.NEW_RELIC_APP_NAME ||
        `${process.env.npm_package_name}-${env}`,
      licenseKey: environment.NEW_RELIC_LICENSE_KEY || dotEnv.NEW_RELIC_LICENSE_KEY,
    };

    return new PSC_API_Config(
      name,
      version,
      dependencies,
      env,
      host,
      port,
      mongo,
      docs,
      newRelic
    );
  }

  private _urlVersion: string;

  private constructor(
    public readonly name: string,
    public readonly version: string,
    public readonly dependencies: PackagedDependencyJsonModel,
    public readonly environment: string,
    public readonly host: string,
    public readonly port: number,
    public readonly mongo: MongoConfig,
    public readonly docs: DocsConfig,
    public readonly newRelic: NewRelicConfig
  ) {
    const versionRegex = /^(\d+)\.(\d+)\.(\d+)(.*)?$/;
    const match = version.match(versionRegex);

    if (match) {
      const [, major, minor, patch, rest] = match;
      this._urlVersion = `v${major || 1}${rest ? `${rest}` : ''}`;
    }
  }

  public get urlVersion() {
    return this._urlVersion;
  }
}
