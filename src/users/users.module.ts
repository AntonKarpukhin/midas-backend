import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { TypeOrmModule } from "@nestjs/typeorm";
import { User } from "./entities/user.entity";
import { HashModule } from "../hash/hash.module";
import { Order } from "../orders/entities/order.entity";
import { Basket } from "../basket/entities/basket.entity";

@Module({
	imports: [TypeOrmModule.forFeature([User, Order, Basket]), HashModule],
	controllers: [UsersController],
	providers: [UsersService],
	exports: [UsersService],
})
export class UsersModule {}
