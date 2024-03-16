import { Sequelize } from 'sequelize-typescript';
import * as process from 'process';
import { User } from '../user/entities/user.entity';
import { Roles } from '../roles/entities/roles.entity';
import { UserRoles } from '../user/entities/UserRoles.entity';

export const databaseProviders = [
  {
    provide: 'SEQUELIZE',
    useFactory: async () => {
      const sequelize = new Sequelize({
        dialect: 'postgres',
        host: process.env.POSTGRES_HOST,
        port: +process.env.POSTGRES_PORT,
        username: process.env.POSTGRES_USER,
        password: process.env.POSTGRES_PASSWORD,
        database: process.env.POSTGRES_DB,
      });
      sequelize.addModels([User, Roles, UserRoles]);
      await sequelize.sync();
      return sequelize;
    },
  },
];
//
