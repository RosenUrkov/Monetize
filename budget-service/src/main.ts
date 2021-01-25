import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { AppModule } from './app.module';
import { identityConfig } from './config/services';
import { ValidationErrorInterceptor } from './middleware/interceptors/validation-error.interceptor';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    AppModule,
    identityConfig,
  );

  app.useGlobalPipes(new ValidationPipe({ whitelist: true, transform: true }));
  app.useGlobalInterceptors(new ValidationErrorInterceptor());

  await app.listen(() => console.log('Budget Service is listening'));
}
bootstrap();
