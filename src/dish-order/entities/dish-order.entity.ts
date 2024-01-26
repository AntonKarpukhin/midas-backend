import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { IsInt, IsNotEmpty, IsNumber, IsString } from "class-validator";
import { Order } from "../../orders/entities/order.entity";

@Entity()
export class DishOrder {
	@PrimaryGeneratedColumn()
	@IsInt()
	id: number

	@Column()
	@IsString()
	@IsNotEmpty()
	name: string;

	@Column()
	@IsNumber()
	@IsNotEmpty()
	price: number;

	@Column()
	@IsString()
	@IsNotEmpty()
	img: string;

	@Column()
	@IsString()
	@IsNotEmpty()
	weight: string;

	@Column()
	@IsNumber()
	count: number

	@Column()
	@IsNumber()
	sumPrice: number

	@ManyToOne(() => Order, (order) => order.dishes)
	order: Order;
}
