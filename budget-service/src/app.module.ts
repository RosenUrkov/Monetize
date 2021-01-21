import { ConfigurationModule } from './config/configuration.module';
import { ConfigModule } from '@nestjs/config';
import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Budget } from './entities/budget.entity';
import { BudgetType } from './entities/budget-type.entity';
import { Payment } from './entities/payment.entity';
import { PaymentDetails } from './entities/payment-details.entity';
import { IDENTIFIERS } from './config/identifiers';

@Module({
  imports: [
    ConfigurationModule,
    TypeOrmModule.forFeature([Budget, BudgetType, Payment, PaymentDetails]),
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
