import { GetRoute, RouteHandler } from '@alien-worlds/aw-core';
import { HealthCheckRouteIO } from './health-check.route-io';
import PSC_API_Config from '../../../config/api-config';

/**
 * @class
 */
export class HealthCheckRoute extends GetRoute {
  public static create(handler: RouteHandler, config: PSC_API_Config) {
    return new HealthCheckRoute(handler, config);
  }

  private constructor(handler: RouteHandler, config: PSC_API_Config) {
    super(`/${config.urlVersion}/PMC_API_/health`, handler, {
      io: new HealthCheckRouteIO(),
    });
  }
}
