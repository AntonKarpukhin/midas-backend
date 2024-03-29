import { CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { IsDate, IsInt } from "class-validator";

@Entity()
export class BaseEntity {
	@PrimaryGeneratedColumn()
	@IsInt()
	id: number

	@CreateDateColumn()
	@IsDate()
	createdAt: Date

	@UpdateDateColumn()
	@IsDate()
	updatedAt: Date
}
