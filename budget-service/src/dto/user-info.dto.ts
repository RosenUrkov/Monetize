import { IsNumber } from 'class-validator';

export class UserInfoDTO {
  @IsNumber()
  public userId: number;
}
