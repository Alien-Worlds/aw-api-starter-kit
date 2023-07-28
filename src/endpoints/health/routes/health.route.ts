import { GetRoute, RouteHandler } from '@alien-worlds/aw-core';
import { PSC_API_Config } from '../../../config';
import { GetHealthRouteIO } from './health.route-io';

export class GetHealthRoute extends GetRoute {
  public static create(handler: RouteHandler, config: PSC_API_Config) {
    return new GetHealthRoute(handler, config);
  }

  private constructor(handler: RouteHandler, config: PSC_API_Config) {
    super(
      `/${config.versions.urlVersion}/PMC_API_/health`,
      handler,
      new GetHealthRouteIO()
    );
  }
}
