import { Failure, Result } from '@alien-worlds/api-core';
import { MongoConfig, MongoSource } from '@alien-worlds/storage-mongodb';

export class MongoHealthTest {
  public static async testConnection(config: MongoConfig): Promise<Result<boolean>> {
    try {
      const mongo = await MongoSource.create(config);
      mongo.client.close();
      return Result.withContent(true);
    } catch (error) {
      return Result.withFailure(Failure.fromError(error));
    }
  }
}
