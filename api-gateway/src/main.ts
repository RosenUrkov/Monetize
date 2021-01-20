import { MicroserviceErrorInterceptor } from './middleware/interceptors/microservice-error.interceptor';
import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(new ValidationPipe({ whitelist: true, transform: true }));
  app.useGlobalInterceptors(new MicroserviceErrorInterceptor());

  await app.listen(app.get(ConfigService).get('PORT'));
}

bootstrap();
