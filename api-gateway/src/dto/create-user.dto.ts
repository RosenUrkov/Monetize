import { Length, Matches } from 'class-validator';

export class CreateUserDTO {
  @Length(2, 20)
  public username: string;

  // Matches passwords with minimum five characters, at least one letter and one number
  @Matches(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{5,}$/, {
    message:
      'The password must be minimum five characters, at least one letter and one number',
  })
  public password: string;
}
