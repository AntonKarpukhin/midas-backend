import { ConflictException, Injectable } from '@nestjs/common';
import { Dish } from "../dishes/entities/dish.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Menu } from "./entities/menu.entity";
import { IResponseMenu } from "../utils/base.types";

@Injectable()
export class MenuService {
	constructor(
		@InjectRepository(Dish)
		private readonly dishRepository: Repository<Dish>,
		@InjectRepository(Menu)
		private readonly menuRepository: Repository<Menu>
	) {}

	async findAllMenu(menuName: string[]): Promise<IResponseMenu> {

		const ad = {}

		for ( const item of menuName ) {
			const menu = await this.menuRepository.findOne( {
				where: {
					name: item
				}
			} );

			if (!menu) throw new ConflictException('Меню не найдено');

			ad[ item ] = await this.findDishes( menu.id );
		}
		return ad;
	}

	async findOneMenuDishes(nameMenu: string): Promise<Dish[]> {
		const menu = await this.menuRepository.findOne( {
			where: {
				name: nameMenu
			}
		} );
		return await this.findDishes( menu.id )
	}

	async findDishes(menuId: number): Promise<Dish[]> {
		return await this.dishRepository.findBy( { fc_menu: { id: menuId } } )
	}

	async findAllCategory(): Promise<Menu[]> {
		return await this.menuRepository.find({
			select: {
				name: true
			}
		})
	}
}
