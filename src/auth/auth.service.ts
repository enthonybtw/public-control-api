import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { $Enums } from "@prisma/client";
import { JwtokenService } from "src/jwtoken/jwtoken.service";
import { UserService } from "src/user/user.service";

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
    private jwtokenService: JwtokenService
  ) {}

  async signUp(
    token: string,
    password: string,
    username: string,
    position: $Enums.Roles
  ) {
    const user = await this.userService.findByToken(token);

    if (user) {
      throw new BadRequestException({ type: "already-exist" });
    }

    const newUser = await this.userService.create(
      token,
      password,
      username,
      position
    );

    const accessToken = await this.jwtService.signAsync({
      id: newUser.id,
      token: newUser.token,
    });

    this.jwtokenService.addJwt(newUser.id, accessToken);

    return { accessToken };
  }

  async signIn(token: string, password: string) {
    const user = await this.userService.findByToken(token);

    if (!user) {
      throw new UnauthorizedException();
    }

    if (password !== user.password) {
      throw new UnauthorizedException();
    }

    const accessToken = await this.jwtService.signAsync({
      id: user.id,
      token: user.token,
    });

    this.jwtokenService.addJwt(user.id, accessToken);

    return { accessToken };
  }

  signOut() {}
}
