import { Module } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { OrdersController } from './orders.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Order } from "./entities/order.entity";
import { DishOrder } from "../dish-order/entities/dish-order.entity";
import { Dish } from "../dishes/entities/dish.entity";
import { User } from "../users/entities/user.entity";
import { UsersService } from "../users/users.service";
import { HashService } from "../hash/hash.service";
import { Basket } from "../basket/entities/basket.entity";

@Module({
	imports: [TypeOrmModule.forFeature([Order, DishOrder, Dish, User, Basket])],
	controllers: [OrdersController],
	providers: [OrdersService, UsersService, HashService],
})
export class OrdersModule {}
