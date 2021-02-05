// delete me
import {
  ClientProviderOptions,
  MicroserviceOptions,
  Transport,
} from '@nestjs/microservices';
import { IDENTIFIERS } from './identifiers';

export const balanceServiceConfig: ClientProviderOptions = {
  name: IDENTIFIERS.balanceService,
  transport: Transport.TCP,
  options: {
    host: '127.0.0.1',
    port: 4001,
  },
};

export const budgetServiceConfig: ClientProviderOptions = {
  name: IDENTIFIERS.budgetService,
  transport: Transport.TCP,
  options: {
    host: '127.0.0.1',
    port: 4002,
  },
};

export const statisticsServiceConfig: ClientProviderOptions = {
  name: IDENTIFIERS.statisticsService,
  transport: Transport.TCP,
  options: {
    host: '127.0.0.1',
    port: 4003,
  },
};
