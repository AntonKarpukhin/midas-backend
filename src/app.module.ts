import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrdersModule } from './orders/orders.module';
import { BasketModule } from './basket/basket.module';
import { MenuModule } from './menu/menu.module';
import { DishesModule } from './dishes/dishes.module';
import { AuthModule } from './auth/auth.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { DishOrderModule } from './dish-order/dish-order.module';

@Module({
  imports: [
	  UsersModule,
	  OrdersModule,
	  MenuModule,
	  BasketModule,
	  DishesModule,
	  AuthModule,
	  DishOrderModule,
	  ConfigModule.forRoot({isGlobal: true}),
	  TypeOrmModule.forRootAsync({
		  imports: [ConfigModule],
		  useFactory: (configService: ConfigService) => ({
			  type: 'postgres',
			  host: configService.get('DB_HOST'),
			  port: configService.get('DB_PORT'),
			  username: configService.get('DB_USERNAME'),
			  password: configService.get('DB_PASSWORD'),
			  database: configService.get('DB_NAME'),
			  synchronize: true,
			  entities: [__dirname + '/**/*.entity{.js, .ts}'],
		  }),
		  inject: [ConfigService]
	}),
	  DishOrderModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
