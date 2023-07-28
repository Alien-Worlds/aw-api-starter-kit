import { DefaultRouteIO, Response } from '@alien-worlds/aw-core';
import { HealthOutput } from '../domain/models/health.output';

export class GetHealthRouteIO extends DefaultRouteIO {
  public toResponse(output: HealthOutput): Response {
    const { result } = output;
    if (result.isFailure) {
      const {
        failure: { error },
      } = result;
      if (error) {
        return {
          status: 500,
          body: {
            status: 'FAIL',
            error: error.message,
          },
        };
      }
    }

    return {
      status: 200,
      body: output.toJSON(),
    };
  }
}
