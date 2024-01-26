import { Injectable } from '@nestjs/common';
import { InjectRepository } from "@nestjs/typeorm";
import { Order } from "./entities/order.entity";
import { Repository } from "typeorm";
import { User } from "../users/entities/user.entity";
import { ReqOrder } from "../utils/base.types";
import { DishOrder } from "../dish-order/entities/dish-order.entity";
import { Dish } from "../dishes/entities/dish.entity";
import { UsersService } from "../users/users.service";

@Injectable()
export class OrdersService {
	constructor(
		private readonly userService: UsersService,
		@InjectRepository(Order)
		private readonly orderRepository: Repository<Order>,
		@InjectRepository(DishOrder)
		private readonly dishOrderRepository: Repository<DishOrder>,
		@InjectRepository(Dish)
		private readonly dishRepository: Repository<Dish>,
		@InjectRepository(User)
		private readonly userRepository: Repository<User>,

	) {}

	async getOrdersByUserId(userId: number): Promise<Order[]> {
		return await this.orderRepository.find( {
			where: {
				user: {
					id: userId
				}
			}
		} )
	}

	async findOneOrder(orderId: number): Promise<DishOrder[]> {
		return  await this.dishOrderRepository.find( {
			where: {
				order: {
					id: orderId
				}
			}
		} )
	}

	async postOrder(userId: number, order: ReqOrder): Promise<Order> {

		const newUserInfo = await this.updateUserWithsOrder(userId, order);
		const newOrder = {
			...order,
			user: newUserInfo,
		}
		const {dishes, ...orderSave} = newOrder;
		const addOrder = this.orderRepository.create(orderSave);
		const saveOrder = await this.orderRepository.save(addOrder);


		const saveDishes: DishOrder[] = await Promise.all(dishes.map(async item => {
			const dish = await this.findDish( item.name );
			return {
				...dish,
				count: item.count,
				sumPrice: item.sumPrice,
				order: addOrder
			}
		}));
		for (const dishes of saveDishes) {
			const addDishes = this.dishOrderRepository.create( dishes );
			await this.dishOrderRepository.save( addDishes );
		}
		return saveOrder;
	}

	async updateUserWithsOrder(userId: number, order: ReqOrder): Promise<User> {
		const userUpdate = await this.userService.findUserInfo('id', userId)
		const updateUser: User = {
			...userUpdate,
			phone: order.phone,
			house: order.house,
			room: order.room,
			street: order.street
		}
		const { password, ...newUser } = updateUser;
		return await this.userRepository.save(newUser);
	}

	async findDish( name: string): Promise<Dish> {
		return await this.dishRepository.findOne({
			where: {
				name
			}
		})
	}
}