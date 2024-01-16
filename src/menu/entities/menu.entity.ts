import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { IsInt, IsNotEmpty, IsString } from "class-validator";
import { Dish } from "../../dishes/entities/dish.entity";

@Entity()
export class Menu {

	@PrimaryGeneratedColumn()
	@IsInt()
	id: number

	@Column({ unique: true })
	@IsString()
	@IsNotEmpty()
	name: string;

	@OneToMany(() => Dish, (dish) => dish.fc_menu)
	dish: Dish[];
}
