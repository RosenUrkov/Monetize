import { Module, Global } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import * as Joi from '@hapi/joi';

@Global()
@Module({
  imports: [
    ConfigModule.forRoot({
      validationSchema: Joi.object({
        REDIS_HOST: Joi.string().required(),
        REDIS_PORT: Joi.number().default(6379),

        STATISTICS_SERVICE_HOST: Joi.string().required(),
        STATISTICS_SERVICE_PORT: Joi.number().default(4003),
      }),
    }),
  ],
  exports: [ConfigModule],
})
export class ConfigurationModule {}
