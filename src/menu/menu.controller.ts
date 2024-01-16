import { Controller, Get, Body, Param, Post } from '@nestjs/common';
import { MenuService } from './menu.service';
import { IResponseMenu } from "../utils/base.types";
import { Dish } from "../dishes/entities/dish.entity";
import { Menu } from "./entities/menu.entity";

@Controller('menu')
export class MenuController {
	constructor(private readonly menuService: MenuService) {}

	@Get()
	async getCategoryMenu(): Promise<Menu[]> {
		return await this.menuService.findAllCategory();
	}

	@Post()
	async getAllMenu(@Body('menu') menu: string[]): Promise<IResponseMenu> {
		return await this.menuService.findAllMenu(menu);
	}

	@Get(':name')
	async getOneMenu(@Param('name') name: string): Promise<Dish[]> {
		return await this.menuService.findOneMenuDishes(name);
	}
}