import { GetRoute, RouteHandler } from '@alien-worlds/aw-core';
import PSC_API_Config from '../../../config/api-config';
import { GetPingRouteIO } from './ping.route-io';

export class GetPingRoute extends GetRoute {
  public static create(handler: RouteHandler, config: PSC_API_Config) {
    return new GetPingRoute(handler, config);
  }

  private constructor(handler: RouteHandler, config: PSC_API_Config) {
    super(`/${config.urlVersion}/PMC_API_/ping`, handler, {
      io: new GetPingRouteIO(),
    });
  }
}
