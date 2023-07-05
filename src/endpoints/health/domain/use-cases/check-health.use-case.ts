import { inject, injectable, Result, UseCase } from '@alien-worlds/api-core';

import { HealthJson } from '../../data/dtos/health.dto';
import { PSC_API_Config } from '../../../../config';
import { MongoHealthTest } from '../../data/mongo.health';
/*IMPORT*/

/**
 * @class
 */
@injectable()
export class CheckHealthUseCase implements UseCase<HealthJson> {
  public static Token = 'CHECK_HEALTH_USE_CASE';
  /*INJECT*/

  constructor(
    /*CONSTRUCTOR.INJECT*/
    @inject('CONFIG')
    private config: PSC_API_Config
  ) {}

  /**
   * @async
   * @returns {Promise<Result<HealthJson>>}
   */
  public async execute(): Promise<Result<HealthJson>> {
    const { config } = this;
    const mongoTestResult = await MongoHealthTest.testConnection(config.mongo);
    const output: HealthJson = {
      // api
      status: 'OK',
      version: process.env.npm_package_version,

      // server
      timestamp: new Date(),
      uptimeSeconds: Math.floor(process.uptime()),
      nodeVersion: process.version,

      dependencies: [
        {
          name: '@alien-worlds/api-core',
          version: config.versions.apiCore,
        },
        {
          name: '@alien-worlds/storage-mongodb',
          version: config.versions.storageMongoDB,
        },
        {
          name: 'express',
          version: config.versions.express,
        },
        {
          name: 'newrelic',
          version: config.versions.newRelic,
        },
      ],

      databases: [
        {
          name: 'mongo',
          status: mongoTestResult.isFailure ? 'ERROR' : 'OK',
        },
      ],
    };

    return Result.withContent(output);
  }

  /*METHOD*/
}
