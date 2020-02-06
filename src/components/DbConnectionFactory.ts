import { injectable } from 'inversify';
import { createConnection, Connection } from 'typeorm';
import { DbConfig } from '@c7s/config';
import { LoggerOptions } from 'typeorm/logger/LoggerOptions';

import { inject, Type } from '../di';
import { Module } from '../Module';
import { TypeormLogger } from '../log/TypeormLogger';

/**
 * TODO timezone
 */
@injectable()
export class DbConnectionFactory {
  @inject(Type.DbConfig)
  protected dbConfig!: DbConfig;

  public async create(modules: Module[]): Promise<Connection> {
    return createConnection({
      logger: new TypeormLogger,
      ...this.getConfig(modules),
    });
  }

  public getConfig(modules: Module[], logging?: LoggerOptions) {
    return {
      ...this.dbConfig,
      logging,
      migrations: modules.map(module => module.migrations),
      entities: modules.map(module => module.models),
    };
  }

}
