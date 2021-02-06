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
        PORT: Joi.number().default(4000),

        TYPEORM_CONNECTION: Joi.string().required(),
        TYPEORM_HOST: Joi.string().required(),
        TYPEORM_PORT: Joi.number().required(),
        TYPEORM_USERNAME: Joi.string().required(),
        TYPEORM_PASSWORD: Joi.string().required(),
        TYPEORM_DATABASE: Joi.string().required(),

        TYPEORM_ENTITIES: Joi.string().required(),
        TYPEORM_MIGRATIONS: Joi.string().required(),
        TYPEORM_MIGRATIONS_DIR: Joi.string().required(),

        JWT_SECRET: Joi.string().required(),
        JWT_EXPIRE_TIME: Joi.number().default(3600),

        BALANCE_SERVICE_HOST: Joi.string().required(),
        BALANCE_SERVICE_PORT: Joi.number().default(4001),
        BUDGET_SERVICE_HOST: Joi.string().required(),
        BUDGET_SERVICE_PORT: Joi.number().default(4002),
        STATISTICS_SERVICE_HOST: Joi.string().required(),
        STATISTICS_SERVICE_PORT: Joi.number().default(4003),
      }),
    }),
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        type: configService.get('TYPEORM_CONNECTION'),
        host: configService.get('TYPEORM_HOST'),
        port: +configService.get('TYPEORM_PORT'),
        username: configService.get('TYPEORM_USERNAME'),
        password: configService.get('TYPEORM_PASSWORD').toString(),
        database: configService.get('TYPEORM_DATABASE').toString(),
        entities: [User],
        synchronize: false,
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
