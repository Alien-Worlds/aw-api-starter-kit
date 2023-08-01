export type PackagedDependencyJsonModel = {
  [key: string]: string;
};
export type HealthCheckJsonModel = {
  status: string;
  version: string;
  timestamp: Date;
  uptimeSeconds: number;
  nodeVersion: string;
  dependencies?: PackagedDependencyJsonModel;
  database?: DatabaseHealthCheckJsonModel;
  [key: string]: unknown;
};

export type DatabaseHealthCheckJsonModel = {
  mongodb: string;
  [key: string]: string;
};
