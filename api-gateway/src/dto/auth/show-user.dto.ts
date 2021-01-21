import { Expose } from 'class-transformer';

export class ShowUserDTO {
  @Expose()
  public id: number;

  @Expose()
  public username: string;
}
