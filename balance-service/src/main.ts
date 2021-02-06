import { ValidationErrorInterceptor } from './middleware/interceptors/validation-error.interceptor';
import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { AppModule } from './app.module';

async function bootstrap() {
  const host = process.env.BALANCE_SERVICE_HOST
    ? process.env.BALANCE_SERVICE_HOST
    : 'localhost';
  const port = process.env.BALANCE_SERVICE_PORT
    ? Number(process.env.BALANCE_SERVICE_PORT)
    : 4001;

  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    AppModule,
    {
      transport: Transport.TCP,
      options: {
        port,
      },
    },
  );

  app.useGlobalPipes(new ValidationPipe({ whitelist: true, transform: true }));
  app.useGlobalInterceptors(new ValidationErrorInterceptor());

  await app.listen(() => console.log('Balance Service is listening'));
}
bootstrap();
