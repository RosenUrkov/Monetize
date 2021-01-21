import { UserInfoDTO } from './dto/user-info.dto';
import {
  Controller,
  Get,
  UseGuards,
  Post,
  Body,
  Param,
  Inject,
  Put,
  Delete,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ClientProxy } from '@nestjs/microservices';
import { IDENTIFIERS } from './config/identifiers';

@Controller('/statistics')
@UseGuards(AuthGuard('jwt'))
export class StatisticsController {
  public constructor(
    @Inject(IDENTIFIERS.statisticsService)
    private readonly statisticsService: ClientProxy,
  ) {}
}
