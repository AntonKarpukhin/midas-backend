import { BaseEntity } from "../../utils/base-entity";
import { Column, Entity, ManyToMany, OneToMany, OneToOne } from "typeorm";
import {
	IsEmail,
	IsNotEmpty,
	IsOptional,
	IsPhoneNumber,
	IsString,
	MaxLength,
	MinLength
} from "class-validator";
import { Basket } from "../../basket/entities/basket.entity";
import { Order } from "../../orders/entities/order.entity";

@Entity()
export class User extends BaseEntity {

	@Column({ unique: true })
	@IsString()
	@IsNotEmpty()
	@MinLength(2, {
		message: 'Имя пользователя должно быть не менее 2 символов',
	})
	@MaxLength(30, {
		message: 'Имя пользователя должно быть не более 30 символов',
	})
	username: string;

	@Column()
	@IsString()
	@IsNotEmpty()
	@MinLength(6, {
		message: 'Пароль должен быть не менее 6 символов',
	})
	password: string;

	@Column({ unique: true })
	@IsNotEmpty()
	@IsEmail()
	email: string;

	@Column({ unique: true, nullable: true })
	@IsOptional()
	@IsPhoneNumber()
	phone: string | null;

	@Column({nullable: true })
	@IsOptional()
	@MinLength(2, {
		message: 'Название улицы должно быть не менее 2 букв',
	})
	@MaxLength(30, {
		message: 'Название улицы должно быть не более 30 букв',
	})
	street: string | null;

	@Column({nullable: true })
	@IsOptional()
	@MinLength(1, {
		message: 'Номер дома должен быть не менее 1 цифры',
	})
	house: string | null;

	@Column({nullable: true })
	@IsOptional()
	@MinLength(1, {
		message: 'Номер квартиры должен быть не менее 1 цифры',
	})
	room: string | null;

	@OneToMany(() => Order, (order) => order.user)
	order: Order[];

	@OneToMany(() => Basket, basket => basket.user)
	basket: Basket[];
}
