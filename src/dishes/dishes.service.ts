import { Injectable } from '@nestjs/common';
import { InjectRepository } from "@nestjs/typeorm";
import { Dish } from "./entities/dish.entity";
import { Repository } from "typeorm";

@Injectable()
export class DishesService {
	constructor(
		@InjectRepository(Dish)
		private readonly dishRepository: Repository<Dish>,
	) {}

	async findDishName(dishName: string): Promise<Dish> {
		return await this.dishRepository.findOne({
			where: {
				name: dishName
			}
		})
	}
}