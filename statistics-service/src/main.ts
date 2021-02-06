import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { ValidationErrorInterceptor } from './middleware/interceptors/validation-error.interceptor';

async function bootstrap() {
  const host = process.env.STATISTICS_SERVICE_HOST
    ? process.env.STATISTICS_SERVICE_HOST
    : 'localhost';
  const port = process.env.STATISTICS_SERVICE_PORT
    ? Number(process.env.STATISTICS_SERVICE_PORT)
    : 4003;

  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    AppModule,
    {
      transport: Transport.TCP,
      options: {
        host,
        port,
      },
    },
  );

  app.useGlobalPipes(new ValidationPipe({ whitelist: true, transform: true }));
  app.useGlobalInterceptors(new ValidationErrorInterceptor());

  await app.listen(() => console.log('Statistics Service is listening'));
}
bootstrap();
