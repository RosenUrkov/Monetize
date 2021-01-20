import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { UserService } from '../services/user.service';
import { ShowUserDTO } from '../../dto/show-user.dto';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private readonly userDataService: UserService,
    configService: ConfigService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: configService.get('JWT_SECRET'),
      ignoreExpiration: false,
    });
  }

  public async validate(payload: ShowUserDTO): Promise<ShowUserDTO> {
    const user = await this.userDataService.findUserByUsername(
      payload.username,
    );

    if (!user) {
      throw new UnauthorizedException();
    }

    return user;
  }
}
