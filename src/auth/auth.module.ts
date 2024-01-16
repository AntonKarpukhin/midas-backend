import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { LocalStrategy } from "./local.strategy";
import { PassportModule } from "@nestjs/passport";
import { JwtStrategy } from "./jwt.strategy";
import { UsersModule } from "../users/users.module";
import { JwtModule } from "@nestjs/jwt/dist";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { HashModule } from "../hash/hash.module";

@Module({
	imports: [
		PassportModule,
		UsersModule,
		HashModule,
		JwtModule.registerAsync({
			imports: [ConfigModule],
			useFactory: (configService: ConfigService) => ({
				secret: configService.get('JWT_SECRET'),
				signOptions: {expiresIn: '30d'},
			}),
			inject: [ConfigService]
		})
	],
	controllers: [AuthController],
	providers: [AuthService, LocalStrategy, JwtStrategy, ConfigService],
})
export class AuthModule {}
