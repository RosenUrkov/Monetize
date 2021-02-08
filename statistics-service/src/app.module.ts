import { ConfigurationModule } from './config/configuration.module';
import { AppService } from './app.service';
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';

@Module({
  imports: [ConfigurationModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
