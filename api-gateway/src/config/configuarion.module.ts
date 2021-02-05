import { Module, Global } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import * as Joi from '@hapi/joi';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/entities/user.entity';
import {
  ClientProxyFactory,
  ClientsModule,
  Transport,
} from '@nestjs/microservices';
import { IDENTIFIERS } from './identifiers';

@Global()
@Module({
  imports: [
    ConfigModule.forRoot({
      validationSchema: Joi.object({
        PORT: Joi.number().required(),
        DB_TYPE: Joi.string().required(),
        DB_HOST: Joi.string().required(),
        DB_PORT: Joi.number().required(),
        DB_USERNAME: Joi.string().required(),
        DB_PASSWORD: Joi.string().required(),
        DB_DATABASE_NAME: Joi.string().required(),
        JWT_SECRET: Joi.string().required(),
        JWT_EXPIRE_TIME: Joi.number().default(3600),

        BALANCE_SERVICE_HOST: Joi.string().required(),
        BALANCE_SERVICE_PORT: Joi.number().required(4001),
        BUDGET_SERVICE_HOST: Joi.string().required(),
        BUDGET_SERVICE_PORT: Joi.number().required(4002),
        STATISTICS_SERVICE_HOST: Joi.string().required(),
        STATISTICS_SERVICE_PORT: Joi.number().required(4003),
      }),
    }),
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        type: configService.get('DB_TYPE'),
        host: configService.get('DB_HOST'),
        port: +configService.get('DB_PORT'),
        username: configService.get('DB_USERNAME'),
        password: configService.get('DB_PASSWORD').toString(),
        database: configService.get('DB_DATABASE_NAME').toString(),
        entities: [User],
        synchronize: true,
      }),
    }),
  ],
  providers: [
    {
      provide: IDENTIFIERS.balanceService,
      useFactory: (configService: ConfigService) => {
        return ClientProxyFactory.create({
          transport: Transport.TCP,
          options: {
            host: configService.get('BALANCE_SERVICE_HOST'),
            port: +configService.get('BALANCE_SERVICE_PORT'),
          },
        });
      },
      inject: [ConfigService],
    },
    {
      provide: IDENTIFIERS.budgetService,
      useFactory: (configService: ConfigService) => {
        return ClientProxyFactory.create({
          transport: Transport.TCP,
          options: {
            host: configService.get('BUDGET_SERVICE_HOST'),
            port: +configService.get('BUDGET_SERVICE_PORT'),
          },
        });
      },
      inject: [ConfigService],
    },
    {
      provide: IDENTIFIERS.statisticsService,
      useFactory: (configService: ConfigService) => {
        return ClientProxyFactory.create({
          transport: Transport.TCP,
          options: {
            host: configService.get('STATISTICS_SERVICE_HOST'),
            port: +configService.get('STATISTICS_SERVICE_PORT'),
          },
        });
      },
      inject: [ConfigService],
    },
  ],
  exports: [
    ConfigModule,
    IDENTIFIERS.balanceService,
    IDENTIFIERS.budgetService,
    IDENTIFIERS.statisticsService,
  ],
})
export class ConfigurationModule {}
