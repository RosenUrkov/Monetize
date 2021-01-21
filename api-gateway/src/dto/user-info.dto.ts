import { IsDefined } from 'class-validator';

export class UserInfoDTO {
  @IsDefined()
  public userId: number;
}
