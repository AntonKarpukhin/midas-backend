import { Controller, Get, Param} from '@nestjs/common';
import { DishesService } from './dishes.service';
import { Dish } from "./entities/dish.entity";

@Controller('dishes')
export class DishesController {
	constructor(private readonly dishesService: DishesService) {}

	@Get(':name')
	async getDish(@Param('name') name: string): Promise<Dish> {
		return await this.dishesService.findDishName(name);
	}
}