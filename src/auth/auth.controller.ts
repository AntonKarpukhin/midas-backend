import { Controller, Get, Post, Body, UseGuards, Req } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UsersService } from "../users/users.service";
import { LocalAuthGuard } from "./guards/local-auth.guard";
import { CreateUserDto } from "../users/dto/create-user.dto";

@Controller()
export class AuthController {
  constructor(
	  private readonly authService: AuthService,
	  private readonly userService: UsersService
  ) {}

	@UseGuards(LocalAuthGuard)
	@Post('signin')
	async login(@Req() req): Promise<{ access_token: string }> {
		return this.authService.auth(req.user)
	}

	@Post('signup')
	async create(@Body() createUserDto: CreateUserDto): Promise<{ access_token: string }> {
	  const user = await this.userService.createUser(createUserDto);
	  return await this.authService.auth(user);
	}
}
