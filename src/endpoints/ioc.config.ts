/* eslint-disable @typescript-eslint/no-unused-vars */
import { DependencyInjector } from '@alien-worlds/aw-core';
import { PingDependencyInjector } from './ping/ping.ioc';
import { HealthDependencyInjector } from './health/health.ioc';
import PSC_API_Config from '../config/api-config';

export class ApiDependencyInjector extends DependencyInjector {
  public async setup(config: PSC_API_Config): Promise<void> {
    const { container } = this;

    const healthDI = new HealthDependencyInjector(container);
    const pingDI = new PingDependencyInjector(container);

    healthDI.setup(config);
    pingDI.setup();
  }
}
