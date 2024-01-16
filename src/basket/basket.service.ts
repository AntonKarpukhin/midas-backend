import { Injectable } from '@nestjs/common';
import { InjectRepository } from "@nestjs/typeorm";
import { Basket } from "./entities/basket.entity";
import { Repository } from "typeorm";
import {  TRequestDish } from "../utils/base.types";
import { User } from "../users/entities/user.entity";

@Injectable()
export class BasketService {
	constructor(
		@InjectRepository(Basket)
		private readonly basketRepository: Repository<Basket>,
	) {}

	async createBasketDish(user: User, dish: TRequestDish): Promise<Basket[]> {
		const newDish = {...dish, user};
		await this.basketRepository.save(newDish);
		return await this.basketRepository.findBy({
			user: { id: user.id }
		})
	}
}
