import { StatisticsController } from './statistics.controller';
import { BudgetController } from './budget.controller';
import { BalanceController } from './balance.controller';
import { ConfigService } from '@nestjs/config';
import { ConfigurationModule } from './config/configuarion.module';
import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { IDENTIFIERS } from './config/identifiers';

@Module({
  imports: [ConfigurationModule, AuthModule],
  controllers: [BalanceController, BudgetController, StatisticsController],
})
export class AppModule {}
