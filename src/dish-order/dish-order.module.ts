import { Module } from '@nestjs/common';
import { DishOrderService } from './dish-order.service';
import { DishOrderController } from './dish-order.controller';
import { TypeOrmModule } from "@nestjs/typeorm";
import { DishOrder } from "./entities/dish-order.entity";

@Module({
	imports: [TypeOrmModule.forFeature([DishOrder])],
	controllers: [DishOrderController],
	providers: [DishOrderService]
})
export class DishOrderModule {}
