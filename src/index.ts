import 'reflect-metadata';

import { Container } from '@alien-worlds/aw-core';
import { PSC_API_ } from './api';
import { config } from './config';
import { mountRoutes } from './routes';
import { ApiDependencyInjector } from './endpoints';

export const start = async () => {
  const ioc = new Container();
  const apiDependencyInjector = new ApiDependencyInjector(ioc);
  apiDependencyInjector.setup(config);

  const api = new PSC_API_(config);
  mountRoutes(api, ioc, config);
  api.start();
};

start();
