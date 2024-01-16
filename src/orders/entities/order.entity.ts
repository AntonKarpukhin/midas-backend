import { BaseEntity } from "../../utils/base-entity";
import { Column, Entity, ManyToMany, ManyToOne, OneToMany } from "typeorm";
import { IsEmail, IsNotEmpty, IsOptional, IsPhoneNumber, IsString, MaxLength, MinLength } from "class-validator";
import { User } from "../../users/entities/user.entity";
import { Dish } from "../../dishes/entities/dish.entity";

enum DeliveryMethod {
	home = 'home',
	pickup = 'pickup'
}

@Entity()
export class Order extends BaseEntity {

	@Column({ unique: true })
	@IsString()
	@IsNotEmpty()
	username: string;

	@Column({ unique: true })
	@IsNotEmpty()
	@IsEmail()
	email: string;

	@Column({ unique: true })
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

	@Column()
	@IsOptional()
	@IsString()
	@IsNotEmpty()
	@MaxLength(1000, {
		message: 'Комментарий должен быть не более 1000 символов',
	})
	comments: string;

	@Column({ enum: DeliveryMethod })
	@IsNotEmpty()
	@IsString()
	deliveryMethod: DeliveryMethod;

	@ManyToOne(() => User, (user) => user.order)
	user: User;

	@ManyToMany(() => Dish, dish => dish.order)
	dishes: Dish[];
}
