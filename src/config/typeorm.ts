import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';

import { DATABASE } from '@environments/database';
import { resolve } from 'path';

const typeOrmOptions: TypeOrmModuleOptions = {
  ...DATABASE,
  type: 'postgres',
  synchronize: true,
  namingStrategy: new SnakeNamingStrategy(),
  entities: [resolve(__dirname, '..', 'entities', '*.{ts,js}')],
  migrations: [resolve(__dirname, '..', 'migrations', '*.{ts,js}')],
  cli: {
    entitiesDir: 'src/entities',
    migrationsDir: 'src/migrations',
  },
};

module.exports = typeOrmOptions;
