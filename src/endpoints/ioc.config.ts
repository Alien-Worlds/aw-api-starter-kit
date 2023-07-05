/* eslint-disable @typescript-eslint/no-unused-vars */
import { Container } from '@alien-worlds/api-core';
import { PSC_API_Config } from '../config';
import { MongoSource } from '@alien-worlds/storage-mongodb';
import { CheckHealthUseCase, HealthController } from './health';
import { PingController } from './ping';

export const setupDependencies = async (config: PSC_API_Config, container: Container) => {
  const mongoSource = await MongoSource.create(config.mongo);

  container.bind<PSC_API_Config>('CONFIG').toConstantValue(config);

  // health
  container.bind<CheckHealthUseCase>(CheckHealthUseCase.Token).to(CheckHealthUseCase);
  container.bind<HealthController>(HealthController.Token).to(HealthController);

  // ping
  container.bind<PingController>(PingController.Token).to(PingController);
};
