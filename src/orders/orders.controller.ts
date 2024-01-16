import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { JwtAuthGuard } from "../auth/guards/jwt-auth.guard";
import { Order } from "./entities/order.entity";

@UseGuards(JwtAuthGuard)
@Controller('users/me/orders')
export class OrdersController {
	constructor(private readonly ordersService: OrdersService) {}

	@Get(':id')
	async findOrder(@Param('id') id: string): Promise<Order> {
		return await this.ordersService.findOneOrder(+id);
	}
}