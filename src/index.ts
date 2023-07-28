import 'reflect-metadata';

import { Container } from '@alien-worlds/aw-core';
import { PSC_API_ } from './api';
import { setupDependencies } from './endpoints';
import { mountRoutes } from './routes';
import { buildConfig } from './config';
import { join } from 'path';

export const start = async () => {
  const config = buildConfig(join(__dirname, '../package.json'));
  const container = new Container();

  await setupDependencies(config, container);

  const api = new PSC_API_(config);
  mountRoutes(api, container);
  api.start();
};

start();
