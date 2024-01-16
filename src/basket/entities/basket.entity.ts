import { BaseEntity } from "../../utils/base-entity";
import { Column, OneToOne, JoinColumn, Entity } from "typeorm";
import { User } from "../../users/entities/user.entity";
import { IsNotEmpty, IsNumber, IsString } from "class-validator";

@Entity()
export class Basket extends BaseEntity {

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
	@IsNotEmpty()
	count: number;

	@Column()
	@IsNumber()
	@IsNotEmpty()
	sumPrice: number;

	@OneToOne(() => User)
	@JoinColumn()
	user: User
}
