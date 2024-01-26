import { Body, Controller, Get, Param, Post, Req, UseGuards } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { JwtAuthGuard } from "../auth/guards/jwt-auth.guard";
import { Order } from "./entities/order.entity";
import { ReqOrder2 } from "../utils/base.types";
import { DishOrder } from "../dish-order/entities/dish-order.entity";

@UseGuards(JwtAuthGuard)
@Controller('users/me/orders')
export class OrdersController {
	constructor(private readonly ordersService: OrdersService) {}

	@Post('history')
	async findAllOrder(@Body('id') id: number): Promise<Order[]> {
		return await this.ordersService.getOrdersByUserId(id);
	}

	@Get('history/:id')
	async findOrder(@Param('id') id: number): Promise<DishOrder[]> {
		return await this.ordersService.findOneOrder(id);
	}

	@Post()
	async sendOrder(@Body('order') order: ReqOrder2): Promise<Order> {
		const { userId, ...ordered } = order
		return await this.ordersService.postOrder(userId, ordered);
	}
}