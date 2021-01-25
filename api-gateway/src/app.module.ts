import { StatisticsController } from './statistics.controller';
import { BudgetController } from './budget.controller';
import { BalanceController } from './balance.controller';
import { ConfigurationModule } from './config/configuarion.module';
import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { AuthModule } from './auth/auth.module';
import { IDENTIFIERS } from './config/identifiers';
import {
  balanceServiceConfig,
  budgetServiceConfig,
  statisticsServiceConfig,
} from './config/services';

@Module({
  imports: [
    ConfigurationModule,
    AuthModule,
    ClientsModule.register([
      balanceServiceConfig,
      budgetServiceConfig,
      statisticsServiceConfig,
    ]),
  ],
  controllers: [BalanceController, BudgetController, StatisticsController],
})
export class AppModule {}
