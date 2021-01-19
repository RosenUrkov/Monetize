import { ConfigurationModule } from './config/configuarion.module';
import { BudgetService } from './services/budget.service';
import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { AppController } from './app.controller';
import { AuthModule } from './auth/auth.module';
import { BalanceService } from './services/balance.service';
import { StatisticsService } from './services/statistics.service';
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
  providers: [BalanceService, StatisticsService, BudgetService],
  controllers: [AppController],
})
export class AppModule {}
