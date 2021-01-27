import { StatisticsController } from './statistics.controller';
import { BudgetController } from './budget.controller';
import { BalanceController } from './balance.controller';
import { ConfigurationModule } from './config/configuarion.module';
import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [ConfigurationModule, AuthModule],
  controllers: [BalanceController, BudgetController, StatisticsController],
})
export class AppModule {}
