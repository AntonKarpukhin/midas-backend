import { Controller, Get, Post, Body, Req, UseGuards } from '@nestjs/common';
import { BasketService } from './basket.service';
import { JwtAuthGuard } from "../auth/guards/jwt-auth.guard";
import { IRequestUser, TRequestDish } from "../utils/base.types";
import { Basket } from "./entities/basket.entity";

@UseGuards(JwtAuthGuard)
@Controller('me/basket')
export class BasketController {
	constructor(private readonly basketService: BasketService) {}

	@Post()
	async addBasketDish(@Req() req: IRequestUser, @Body('idCount') idCount: {name: string, count: number}): Promise<Basket[]> {
		const {name, count} = idCount;
		return await this.basketService.createBasketDish(req.user, name, count);
	}

	@Post('/delete')
	async deleteBasketDish(@Req() req: IRequestUser, @Body('name') name: string): Promise<Basket[]> {
		return await this.basketService.deleteDish(req.user, name);
	}

	@Get()
	async getAllBasketDish(@Req() req: IRequestUser): Promise<Basket[]> {
		return await this.basketService.findAllDishes(req.user);
	}
}
