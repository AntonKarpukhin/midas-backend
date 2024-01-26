import {
	Column,
	CreateDateColumn,
	Entity,
	ManyToOne,
	OneToMany,
	PrimaryGeneratedColumn,
	UpdateDateColumn
} from "typeorm";
import { IsDate, IsEmail, IsInt, IsNotEmpty, IsPhoneNumber, IsString, MaxLength, MinLength } from "class-validator";
import { User } from "../../users/entities/user.entity";
import { DishOrder } from "../../dish-order/entities/dish-order.entity";

enum DeliveryMethod {
	home = 'home',
	pickup = 'pickup'
}

@Entity()
export class Order {

	@PrimaryGeneratedColumn()
	@IsInt()
	id: number

	@CreateDateColumn()
	@IsDate()
	createdAt: Date

	@UpdateDateColumn()
	@IsDate()
	updatedAt: Date

	@Column()
	@IsString()
	@IsNotEmpty()
	username: string;

	@Column()
	@IsNotEmpty()
	@IsEmail()
	email: string;

	@Column()
	@IsNotEmpty()
	@IsPhoneNumber()
	phone: string;

	@Column()
	@IsNotEmpty()
	@MinLength(2, {
		message: 'Название улицы должно быть не менее 2 букв',
	})
	@MaxLength(30, {
		message: 'Название улицы должно быть не более 30 букв',
	})
	street: string;

	@Column()
	@IsNotEmpty()
	@MinLength(1, {
		message: 'Номер дома должен быть не менее 1 цифры',
	})
	house: string;

	@Column()
	@IsNotEmpty()
	@MinLength(1, {
		message: 'Номер квартиры должен быть не менее 1 цифры',
	})
	room: string;

	@Column({ enum: DeliveryMethod })
	@IsNotEmpty()
	@IsString()
	deliveryMethod: DeliveryMethod;

	@ManyToOne(() => User, (user) => user.order)
	user: User;

	@OneToMany(() => DishOrder, (dish) => dish.order)
	dishes: DishOrder[];
}