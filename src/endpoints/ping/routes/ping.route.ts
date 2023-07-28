import { GetRoute, RouteHandler } from '@alien-worlds/aw-core';
import { PSC_API_Config } from '../../../config';
import { GetPingRouteIO } from './ping.route-io';

export class GetPingRoute extends GetRoute {
  public static create(handler: RouteHandler, config: PSC_API_Config) {
    return new GetPingRoute(handler, config);
  }

  private constructor(handler: RouteHandler, config: PSC_API_Config) {
    super(`/${config.versions.urlVersion}/PMC_API_/ping`, handler, new GetPingRouteIO());
  }
}
