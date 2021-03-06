import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';

import { DATABASE } from '@environments/database';
import { join } from 'path';

const typeOrmOptions: TypeOrmModuleOptions = {
  ...DATABASE,
  type: 'postgres',
  synchronize: true,
  namingStrategy: new SnakeNamingStrategy(),
  entities: [join(__dirname, '..', '**', '*.entity.{ts,js}')],
  migrations: [join(__dirname, '..', '**', 'migrations', '*.{ts,js}')],
  cli: {
    entitiesDir: 'src/entities',
    migrationsDir: 'src/migrations',
  },
};

module.exports = typeOrmOptions;
