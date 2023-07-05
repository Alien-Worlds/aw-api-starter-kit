import { inject, injectable } from '@alien-worlds/api-core';
import { HealthOutput } from './models/health.output';
import { CheckHealthUseCase } from './use-cases/check-health.use-case';
/*IMPORT*/

@injectable()
export class HealthController {
  public static Token = 'HEALTH_CONTROLLER';

  /*INJECT*/

  constructor(
    /*CONSTRUCTOR.INJECT*/
    @inject(CheckHealthUseCase.Token)
    private checkHealthUseCase: CheckHealthUseCase
  ) {}

  public async health(): Promise<HealthOutput> {
    const result = await this.checkHealthUseCase.execute();
    return HealthOutput.create(result);
  }

  /*METHOD*/
}
