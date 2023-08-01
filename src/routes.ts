import PSC_API_Config from './config/api-config';
import { PSC_API_ } from './api';
import { Container, Route } from '@alien-worlds/aw-core';
import { PingController, HealthController } from './endpoints';
import { HealthCheckRoute } from './endpoints/health/routes/health-check.route';
import { GetPingRoute } from './endpoints/ping/routes/ping.route';
/*IMPORT*/

export const mountRoutes = (api: PSC_API_, container: Container, config: PSC_API_Config) => {
  // Health
  const healthController = container.get<HealthController>(HealthController.Token);
  Route.mount(
    api.framework,
    HealthCheckRoute.create(healthController.healthCheck.bind(healthController), config)
  );

  // Ping
  const pingController = container.get<PingController>(PingController.Token);
  Route.mount(
    api.framework,
    GetPingRoute.create(pingController.ping.bind(pingController), config)
  );

  /*ROUTE.MOUNT*/
};
