import { inject, injectable, Result, UseCase } from '@alien-worlds/aw-core';
import { HealthCheckStatus } from '../entities/health-check-status';
import { DatabaseService } from '../services/database.service';
import PSC_API_Config from '../../../../config/api-config';

/**
 * @class
 */
@injectable()
export class GetHealthCheckStatusUseCase implements UseCase<HealthCheckStatus> {
  public static Token = 'GET_HEALTH_CHECK_STATUS_USE_CASE';

  constructor(
    @inject(PSC_API_Config.Token)
    private appConfig: PSC_API_Config,
    @inject(DatabaseService.Token)
    private databaseService: DatabaseService
  ) {}

  /**
   * @async
   * @returns {Promise<Result<HealthCheckStatus>>}
   */
  public async execute(): Promise<Result<HealthCheckStatus>> {
    const { content: databaseConnectionStats } =
      await this.databaseService.checkConnection();
    const { version, dependencies } = this.appConfig;

    const status = HealthCheckStatus.create(
      version,
      dependencies,
      databaseConnectionStats
    );

    return Result.withContent(status);
  }
}
