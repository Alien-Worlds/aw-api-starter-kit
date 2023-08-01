import { DependencyInjector } from '@alien-worlds/aw-core';
import { HealthController } from './domain/health.controller';
import { GetHealthCheckStatusUseCase } from './domain/use-cases/get-health-check-status.use-case';
import { DatabaseService } from './domain/services/database.service';
import { DatabaseServiceImpl } from './data/services/database.service-impl';
import PSC_API_Config from '../../config/api-config';

export class HealthDependencyInjector extends DependencyInjector {
  public async setup(config: PSC_API_Config): Promise<void> {
    const { container } = this;

    container.bind<PSC_API_Config>(PSC_API_Config.Token).toConstantValue(config);
    container
      .bind<DatabaseService>(DatabaseService.Token)
      .toConstantValue(new DatabaseServiceImpl(config));
    container
      .bind<GetHealthCheckStatusUseCase>(GetHealthCheckStatusUseCase.Token)
      .to(GetHealthCheckStatusUseCase);
    container.bind<HealthController>(HealthController.Token).to(HealthController);
  }
}
