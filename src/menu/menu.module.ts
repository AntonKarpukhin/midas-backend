import { Module } from '@nestjs/common';
import { MenuService } from './menu.service';
import { MenuController } from './menu.controller';
import { TypeOrmModule } from "@nestjs/typeorm";
import { Menu } from "./entities/menu.entity";
import { Dish } from "../dishes/entities/dish.entity";

@Module({
	imports: [TypeOrmModule.forFeature([Menu, Dish])],
	controllers: [MenuController],
	providers: [MenuService],
})
export class MenuModule {}
