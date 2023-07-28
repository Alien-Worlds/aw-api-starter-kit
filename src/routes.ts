import { PSC_API_Config } from './config/config.types';
import { PSC_API_ } from './api';
import { Container, Route } from '@alien-worlds/aw-core';
import { PingController, HealthController } from './endpoints';
import { GetHealthRoute } from './endpoints/health/routes/health.route';
import { GetPingRoute } from './endpoints/ping/routes/ping.route';
/*IMPORT*/

export const mountRoutes = (api: PSC_API_, container: Container) => {
  const config = container.get<PSC_API_Config>('CONFIG');

  // Health
  const healthController = container.get<HealthController>(HealthController.Token);
  Route.mount(
    api.framework,
    GetHealthRoute.create(healthController.health.bind(healthController), config)
  );

  // Ping
  const pingController = container.get<PingController>(PingController.Token);
  Route.mount(
    api.framework,
    GetPingRoute.create(pingController.ping.bind(pingController), config)
  );

  /*ROUTE.MOUNT*/
};
