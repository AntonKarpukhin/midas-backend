import { Injectable } from '@nestjs/common';
import { InjectRepository } from "@nestjs/typeorm";
import { Order } from "./entities/order.entity";
import { Repository } from "typeorm";

@Injectable()
export class OrdersService {
	constructor(
		@InjectRepository(Order)
		private readonly orderRepository: Repository<Order>,
	) {}

	async findOneOrder(orderId: number): Promise<Order> {
		return  await this.orderRepository.findOneBy( { id: orderId } )
	}
}