import { log } from '@alien-worlds/api-core';
import bodyParser from 'body-parser';
import express, { Express } from 'express';
import cors from 'cors';
import YAML from 'yaml';
import swaggerUi from 'swagger-ui-express';
import { PSC_API_Config } from './config/config.types';
import { readFileSync } from 'fs';
import { join } from 'path';

export class PSC_API_ {
  private app: Express;

  constructor(private config: PSC_API_Config) {
    this.app = express();
    this.app.use(
      cors({
        origin: '*',
      })
    );
    this.app.use(bodyParser.json());

    const file = readFileSync(join(__dirname, '../docs/PMC_API_-oas.yaml'), 'utf8');
    const swaggerDocument = YAML.parse(file);
    this.app.use(
      `/${config.versions.urlVersion}/PMC_API_/docs`,
      swaggerUi.serve,
      swaggerUi.setup(swaggerDocument)
    );
  }

  public async start() {
    const {
      config: { port },
    } = this;
    this.app.listen(port, () => {
      log(`Server is running at http://localhost:${port}`);
    });
  }

  public get framework(): Express {
    return this.app;
  }
}
