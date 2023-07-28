import { GetRoute, RouteHandler } from '@alien-worlds/aw-core';
import { HealthOutput } from '../domain/models/health.output';
import { PSC_API_Config } from '../../../config';
/*IMPORT*/

export class GetHealthRoute extends GetRoute {
  public static create(handler: RouteHandler, config: PSC_API_Config) {
    return new GetHealthRoute(handler, config);
  }

  private constructor(handler: RouteHandler, config: PSC_API_Config) {
    super(`/${config.versions.urlVersion}/PMC_API_/health`, handler, {
      hooks: {
        post: (output: HealthOutput) => output.toResponse(),
      },
    });
  }
}
