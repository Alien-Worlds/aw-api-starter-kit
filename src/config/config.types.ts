import { MongoConfig } from '@alien-worlds/aw-storage-mongodb';

export type Environment = {
  MONGO_HOSTS?: string;
  MONGO_PORTS?: string;
  MONGO_USER?: string;
  MONGO_PASSWORD?: string;
  MONGO_SRV?: number;
  MONGO_SSL?: number;
  MONGO_REPLICA_SET?: string;
  MONGO_AUTH_MECHANISM?: string;
  MONGO_AUTH_SOURCE?: string;
  MONGO_DB_NAME?: string;

  PORT?: string;
  HOST?: string;

  DOCS_HOST?: string;
  DOCS_ROUTE_PREFIX?: string;
  DOCS_EXPOSE_ROUTE?: string;
  ENVIRONMENT?: string;

  NEW_RELIC_ENABLED?: string;
  NEW_RELIC_LICENSE_KEY?: string;
  NEW_RELIC_APP_NAME?: string;
};

export type PackagedDependencyJsonModel = {
  [name: string]: string;
};

export type Config = {
  host: string;
  port: number;
  mongo: MongoConfig;
  docs: DocsConfig;
  newRelic: NewRelicConfig;
};

export type DocsConfig = {
  host: string;
  routePrefix: string;
  exposeRoute: boolean;
};

export type NewRelicConfig = {
  newRelicEnabled: boolean;
  appName: string;
  licenseKey: string;
};
