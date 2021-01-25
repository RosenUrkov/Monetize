import {
  ClientProviderOptions,
  MicroserviceOptions,
  Transport,
} from '@nestjs/microservices';
import { IDENTIFIERS } from './identifiers';

export const statisticsServiceConfig: ClientProviderOptions = {
  name: IDENTIFIERS.statisticsService,
  transport: Transport.TCP,
  options: {
    host: '127.0.0.1',
    port: 4003,
  },
};

export const identityConfig: MicroserviceOptions = {
  transport: Transport.TCP,
  options: {
    host: '127.0.0.1',
    port: 4002,
  },
};
