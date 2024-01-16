import { Column, Entity, ManyToMany, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { IsInt, IsNotEmpty, IsNumber, IsString } from "class-validator";
import { Menu } from "../../menu/entities/menu.entity";
import { Order } from "../../orders/entities/order.entity";

@Entity()
export class Dish {

	@PrimaryGeneratedColumn()
	@IsInt()
	id: number

	@Column()
	@IsString()
	@IsNotEmpty()
	name: string;

	@Column()
	@IsString()
	@IsNotEmpty()
	description: string;

	@Column()
	@IsNumber()
	@IsNotEmpty()
	price: number;

	@Column()
	@IsNumber()
	@IsNotEmpty()
	oldPrice: number;

	@Column()
	@IsString()
	@IsNotEmpty()
	img: string;

	@Column()
	@IsString()
	@IsNotEmpty()
	weight: string;

	@ManyToOne(() => Menu, (menu) => menu.dish)
	fc_menu: Menu;

	@ManyToMany(() => Order, order => order.dishes)
	order: Order[];
}
