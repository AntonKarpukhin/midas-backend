import { IsEmail, IsOptional, IsPhoneNumber, IsString, Length, MaxLength, MinLength } from "class-validator";

export class UpdateUserDto {
	@IsOptional()
	@IsString()
	@Length(2, 30)
	username?: string;

	@IsOptional()
	@IsString()
	@MinLength(4, {
		message: 'Пароль должен быть не менее 4 символов',
	})
	password?: string | null;

	@IsOptional()
	@IsEmail()
	@Length(2, 30)
	email?: string;

	@IsOptional()
	@IsPhoneNumber()
	phone?: string | null;

	@IsOptional()
	@IsString()
	@MinLength(2, {
		message: 'Название улицы должно быть не менее 2 букв',
	})
	@MaxLength(30, {
		message: 'Название улицы должно быть не более 30 букв',
	})
	street?: string | null;

	@IsOptional()
	@IsString()
	@MinLength(1, {
		message: 'Номер дома должен быть не менее 1 цифры',
	})
	house?: string | null;

	@IsOptional()
	@IsString()
	@MinLength(1, {
		message: 'Номер квартиры должен быть не менее 1 цифры',
	})
	room?: string | null;
}
