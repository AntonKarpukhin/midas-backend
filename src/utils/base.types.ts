import { User } from "../users/entities/user.entity";
import { Request as IRequest } from "express";
import { Dish } from "../dishes/entities/dish.entity";
import { Basket } from "../basket/entities/basket.entity";
import { Order } from "../orders/entities/order.entity";

export type TUser = Omit<User, 'password'>;

export interface IRequestUser extends IRequest {
	user: User
}

export interface IResponseMenu {
	[key: string]: Dish[];
}

export type TRequestDish = Omit<Basket, 'user'>

export interface ReqDishOrder extends Dish {
	count: number,
	sumPrice: number
}

export type ReqOrder = Omit<Order, 'id'>

export interface ReqOrder2 extends ReqOrder {
	userId: number
}