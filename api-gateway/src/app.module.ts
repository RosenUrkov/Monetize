import { StatisticsController } from './statistics.controller';
import { BudgetController } from './budget.controller';
import { BalanceController } from './balance.controller';
import { ConfigurationModule } from './config/configuarion.module';
import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { AuthModule } from './auth/auth.module';
import { IDENTIFIERS } from './config/identifiers';

@Module({
  imports: [
    ConfigurationModule,
    AuthModule,
    ClientsModule.register([
      {
        name: IDENTIFIERS.balanceService,
        transport: Transport.TCP,
        options: {
          host: '127.0.0.1',
          port: 4001,
        },
      },
      {
        name: IDENTIFIERS.budgetService,
        transport: Transport.TCP,
        options: {
          host: '127.0.0.1',
          port: 4002,
        },
      },
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
  controllers: [BalanceController, BudgetController, StatisticsController],
})
export class AppModule {}
