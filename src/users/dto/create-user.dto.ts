import { IsEmail, IsNotEmpty, IsString, MaxLength, MinLength } from "class-validator";

export class CreateUserDto {
	@IsString()
	@IsNotEmpty()
	@MinLength(2, {
		message: 'Имя пользователя должно быть не менее 2 символов',
	})
	@MaxLength(30, {
		message: 'Имя пользователя должно быть не более 30 символов',
	})
	username: string;

	@IsString()
	@IsNotEmpty()
	@MinLength(4, {
		message: 'Пароль должен быть не менее 4 символов',
	})
	password: string;

	@IsString()
	@IsNotEmpty()
	@IsEmail()
	email: string;
}
