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
	async addBasketDish(@Req() req: IRequestUser, @Body() dish: TRequestDish): Promise<Basket[]> {
		return await this.basketService.createBasketDish(req.user, dish);
	}

}
