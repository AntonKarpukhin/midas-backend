import { Injectable } from '@nestjs/common';
import { InjectRepository } from "@nestjs/typeorm";
import { Basket } from "./entities/basket.entity";
import { Repository } from "typeorm";
import { User } from "../users/entities/user.entity";
import { Dish } from "../dishes/entities/dish.entity";

@Injectable()
export class BasketService {
	constructor(
		@InjectRepository(Basket)
		private readonly basketRepository: Repository<Basket>,
		@InjectRepository(Dish)
		private readonly dishRepository: Repository<Dish>,
	) {}

	async createBasketDish(user: User, name: string, num: number): Promise<Basket[]> {

		const basketDish: Basket  = await this.basketRepository.findOne({
			where: {
				name: name,
				user: {id: user.id}
			}
		})

		if (basketDish) {
			const sumBasketDish = await (basketDish.count + num) * basketDish.price;
			const countBasketDish = await basketDish.count + num;

			if (countBasketDish === 0) {
				await this.basketRepository.delete({ name: name, user: { id: user.id }});
				return await this.findAllDishes(user);
			}
			const newBasketDish: Basket = {...basketDish, count: countBasketDish, sumPrice: sumBasketDish};
			await this.basketRepository.update( { name: name, user: { id: user.id } }, newBasketDish );
			return await this.findAllDishes(user);
		}

		const dish: Dish = await this.dishRepository.findOne({
			where: {
				name: name
			}
		})
		const sumDish = await num * dish.price;
		const newDish: Basket = {...dish, count: num, sumPrice: sumDish, user: user};
		await this.basketRepository.create(newDish);
		await this.basketRepository.save(newDish);
		return await this.findAllDishes(user);
	}

	async deleteDish(user: User, name: string): Promise<Basket[]> {
		await this.basketRepository.delete({
			name: name,
			user: {
				id: user.id
			}
		})
		return await this.findAllDishes(user);
	}

	async findAllDishes(user: User) {
		return  await this.basketRepository.find( { where: { user: { id: user.id } } } ).then( res => res.sort( ( a, b ) => a.id - b.id ) );
	}
}
