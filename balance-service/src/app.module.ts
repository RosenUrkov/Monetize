import { PaymentService } from './services/payment.service';
import { ConfigurationModule } from './config/configuration.module';
import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { AppController } from './app.controller';
import { IDENTIFIERS } from './config/identifiers';
import { StatisticsService } from './services/statistics.service';

@Module({
  imports: [
    ConfigurationModule,
    ClientsModule.register([
      {
        name: IDENTIFIERS.statisticsService,
        transport: Transport.TCP,
        options: {
          host: '127.0.0.1',
          port: 4003,
        },
      },
    ]),
  ],
  providers: [StatisticsService, PaymentService],
  controllers: [AppController],
})
export class AppModule {}
