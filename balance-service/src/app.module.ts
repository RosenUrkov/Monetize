import { AppService } from './app.service';
import { ConfigurationModule } from './config/configuration.module';
import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { AppController } from './app.controller';
import { IDENTIFIERS } from './config/identifiers';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Payment } from './entities/payment.entity';
import { Account } from './entities/account.entity';
import { PaymentDetails } from './entities/payment-details.entity';

@Module({
  imports: [
    ConfigurationModule,
    TypeOrmModule.forFeature([Payment, Account, PaymentDetails]),
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
  providers: [AppService],
  controllers: [AppController],
})
export class AppModule {}
