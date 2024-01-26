import { Controller, Get, Param} from '@nestjs/common';
import { DishesService } from './dishes.service';
import { Dish } from "./entities/dish.entity";

@Controller('dishes')
export class DishesController {
	constructor(private readonly dishesService: DishesService) {}

	@Get(':id')
	async getDish(@Param('id') id: number): Promise<Dish> {
		return await this.dishesService.findDishId(id);
	}
}