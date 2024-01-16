import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from "../users/users.service";
import { User } from "../users/entities/user.entity";
import { HashService } from "../hash/hash.service";

@Injectable()
export class AuthService {
	constructor(
		private readonly userService: UsersService,
		private readonly jwtService: JwtService,
		private readonly hashService: HashService,
	) {}

	async auth(user: User) {
		const payload = { sub: user.id };
		return { access_token: this.jwtService.sign(payload) };
	}

	async validateUser(username: string, password: string) {
		const user = await this.userService.findUserInfo('username', username);

		if (!user) throw new UnauthorizedException('Юзернейм или Пароль не совпадают');

		const isCorrect = this.hashService.compare(password, user.password);

		if (!isCorrect) throw new UnauthorizedException('Юзернейм или Пароль не совпадают');

		return user
	}
}
