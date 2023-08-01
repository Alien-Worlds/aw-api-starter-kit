import {
  DatabaseHealthCheckJsonModel,
  HealthCheckJsonModel,
  PackagedDependencyJsonModel,
} from '../../data/dtos/health.dto';
import { Entity } from '@alien-worlds/aw-core';

/**
 * Represents HealthOutput data entity.
 * @class
 */
export class HealthCheckStatus implements Entity {
  public static create(
    version: string,
    dependencies: PackagedDependencyJsonModel,
    database: DatabaseHealthCheckJsonModel
  ): HealthCheckStatus {
    return new HealthCheckStatus(version, dependencies, database);
  }

  /**
   * @private
   * @constructor
   */
  private constructor(
    public readonly version: string,
    public readonly dependencies: PackagedDependencyJsonModel,
    public readonly database: DatabaseHealthCheckJsonModel
  ) {}

  public get status(): string {
    return 'OK';
  }

  public get nodeVersion(): string {
    return process.version;
  }

  public get timestamp(): Date {
    return new Date();
  }

  public get uptimeSeconds(): number {
    return Math.floor(process.uptime());
  }
  /**
   * Creates JSON object based on entity data.
   *
   * @public
   * @returns {object}
   */
  public toJSON(): HealthCheckJsonModel {
    const {
      status,
      version,
      timestamp,
      uptimeSeconds,
      nodeVersion,
      database,
      dependencies,
    } = this;

    const stats = {
      status,
      version,
      timestamp,
      uptimeSeconds,
      nodeVersion,
      dependencies,
      database,
    };

    return stats;
  }
}
