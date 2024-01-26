import { Column, OneToOne, JoinColumn, Entity, PrimaryGeneratedColumn, ManyToMany, ManyToOne } from "typeorm";
import { User } from "../../users/entities/user.entity";
import { IsInt, IsNotEmpty, IsNumber, IsString } from "class-validator";

@Entity()
export class Basket {

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
	@IsNotEmpty()
	count: number;

	@Column()
	@IsNumber()
	@IsNotEmpty()
	sumPrice: number;

	@ManyToOne(() => User)
	@JoinColumn()
	user: User
}
