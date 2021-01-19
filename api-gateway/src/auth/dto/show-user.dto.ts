import { Expose } from 'class-transformer';

export class ShowUserDTO {
  @Expose()
  public username: string;
}
