import { Module } from '@nestjs/common';
import { BasketService } from './basket.service';
import { BasketController } from './basket.controller';
import { TypeOrmModule } from "@nestjs/typeorm";
import { Basket } from "./entities/basket.entity";
import { Dish } from "../dishes/entities/dish.entity";

@Module({
	imports: [TypeOrmModule.forFeature([Basket, Dish])],
	controllers: [BasketController],
	providers: [BasketService],
	exports: [BasketModule]
})
export class BasketModule {}
