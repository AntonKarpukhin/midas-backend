import { IsEmail, IsOptional, IsPhoneNumber, IsString, Length } from "class-validator";

export class UpdateUserDto {
	@IsOptional()
	@IsString()
	@Length(2, 30)
	username?: string;

	@IsOptional()
	@IsString()
	@Length(6, 20)
	password?: string;

	@IsOptional()
	@IsEmail()
	@Length(2, 30)
	email?: string;

	@IsOptional()
	@IsPhoneNumber()
	phone?: string;

	@IsOptional()
	@IsString()
	@Length(2, 30)
	street?: string;

	@IsOptional()
	@IsString()
	@Length(1)
	house?: string;

	@IsOptional()
	@IsString()
	@Length(1)
	room?: string;
}
