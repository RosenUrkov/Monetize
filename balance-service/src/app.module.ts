import { AppService } from './app.service';
import { ConfigurationModule } from './config/configuration.module';
import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { AppController } from './app.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Payment } from './entities/payment.entity';
import { Account } from './entities/account.entity';
import { PaymentDetails } from './entities/payment-details.entity';
import { statisticsServiceConfig } from './config/services';
import { IDENTIFIERS } from './config/identifiers';

@Module({
  imports: [
    ConfigurationModule,
    TypeOrmModule.forFeature([Payment, Account, PaymentDetails]),
    ClientsModule.register([statisticsServiceConfig]),
  ],
  providers: [AppService],
  controllers: [AppController],
})
export class AppModule {}
