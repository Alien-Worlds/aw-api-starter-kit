import { MongoConfig } from '@alien-worlds/aw-storage-mongodb';

export type Versions = {
  api: string;
  urlVersion: string;
  apiCore: string;
  storageMongoDB: string;
  express: string;
  newRelic: string;
};

export type PSC_API_Config = {
  versions: Versions;
  port: number;
  mongo: MongoConfig;
  newRelic?: NewRelicConfig;
};

export type NewRelicConfig = {
  newRelicEnabled: boolean;
  appName: string;
  licenseKey: string;
};
