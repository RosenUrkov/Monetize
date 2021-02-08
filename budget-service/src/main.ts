import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { AppModule } from './app.module';
import { ValidationErrorInterceptor } from './middleware/interceptors/validation-error.interceptor';

async function bootstrap() {
  const host = process.env.BUDGET_SERVICE_HOST
    ? process.env.BUDGET_SERVICE_HOST
    : '0.0.0.0';
  const port = process.env.BUDGET_SERVICE_PORT
    ? Number(process.env.BUDGET_SERVICE_PORT)
    : 4002;

  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    AppModule,
    {
      transport: Transport.TCP,
      options: {
        port,
        host,
      },
    },
  );

  app.useGlobalPipes(new ValidationPipe({ whitelist: true, transform: true }));
  app.useGlobalInterceptors(new ValidationErrorInterceptor());

  await app.listen(() => console.log('Budget Service is listening'));
}
bootstrap();
