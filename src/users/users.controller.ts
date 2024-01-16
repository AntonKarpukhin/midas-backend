import { Controller, Get, Body, Patch, UseGuards, Req } from '@nestjs/common';
import { UsersService } from './users.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { JwtAuthGuard } from "../auth/guards/jwt-auth.guard";
import { IRequestUser, TUser } from "../utils/base.types";
import { Order } from "../orders/entities/order.entity";
import { Basket } from "../basket/entities/basket.entity";

@UseGuards(JwtAuthGuard)
@Controller('users')
export class UsersController {
	constructor(
		private readonly usersService: UsersService
	) {}

	@Get('me')
	async findMe(@Req() req: IRequestUser): Promise<TUser> {
		const {password, ...user} = await req.user
		return user;
	}

	@Patch('me')
	async updateMe(@Req() req: IRequestUser, @Body() updateUserDto: UpdateUserDto): Promise<TUser> {
		return await this.usersService.updateUser(req.user, updateUserDto)
	}

	@Get('me/orders')
	async getMeOrders(@Req() req: IRequestUser): Promise<Order[]> {
		return await this.usersService.findOrders(req.user.id);
	}

	@Get('me/basket')
	async getMeBasket(@Req() req: IRequestUser): Promise<Basket[]> {
		return await this.usersService.findBasket(req.user.id);
	}

}
