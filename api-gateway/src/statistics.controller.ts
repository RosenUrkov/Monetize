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
  Query,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ClientProxy } from '@nestjs/microservices';
import { IDENTIFIERS } from './config/identifiers';
import { User } from './middleware/decorators/user.decorator';
import { Observable } from 'rxjs';
import { ShowUserDTO } from './dto/auth/show-user.dto';
import { ShowBudgetDTO } from './dto/budget/show-budget.dto';
import { GetStatisticsDTO } from './dto/statistics/get-statistics.dto';

@Controller('/statistics')
@UseGuards(AuthGuard('jwt'))
export class StatisticsController {
  public constructor(
    @Inject(IDENTIFIERS.statisticsService)
    private readonly statisticsService: ClientProxy,
  ) {}

  @Get()
  public getStatistics(
    @User() user: ShowUserDTO,
    @Query() info: GetStatisticsDTO,
  ): Observable<any> {
    console.log('hereee', info);

    const payload: UserInfoDTO & GetStatisticsDTO = {
      userId: user.id,
      ...info,
    };
    return this.statisticsService.send(IDENTIFIERS.getStatistics, payload);
  }
}
