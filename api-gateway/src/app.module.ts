import { BudgetService } from './core/budget.service';
import { CoreModule } from './core/core.module';
import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { AppController } from './app.controller';
import { AuthModule } from './auth/auth.module';
import { BalanceService } from './core/balance.service';
import { StatisticsService } from './core/statistics.service';
import { IDENTIFIERS } from './common/identifiers';

@Module({
  imports: [
    CoreModule,
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
  providers: [BalanceService, StatisticsService, BudgetService],
  controllers: [AppController],
})
export class AppModule {}
