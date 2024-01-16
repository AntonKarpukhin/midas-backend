import { ConflictException, ForbiddenException, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from "./entities/user.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { HashService } from "../hash/hash.service";
import { TUser } from "../utils/base.types";
import { Order } from "../orders/entities/order.entity";
import { Basket } from "../basket/entities/basket.entity";

@Injectable()
export class UsersService {
	constructor(
		@InjectRepository(User)
		private readonly userRepository: Repository<User>,
		private readonly hashService: HashService,
		@InjectRepository(Order)
		private readonly orderRepository: Repository<Order>,
		@InjectRepository(Basket)
		private readonly basketRepository: Repository<Basket>,
	) { }

	async createUser(createUserDto: CreateUserDto): Promise<User> {
		const userName = await this.findUserName(createUserDto.username);
		const userEmail = await this.findUserEmail(createUserDto.email)

		if (userName !== null) {
			throw new ForbiddenException(
				'Пользователь с таким именем уже существует'
			);
		}

		if (userEmail !== null) {
			throw new ForbiddenException(
				'Пользователь с таким e-mail уже существует'
			);
		}

		createUserDto.password = this.hashService.getHash(createUserDto?.password);
		const user = this.userRepository.create(createUserDto);
		return await this.userRepository.save(user);
	}

	async updateUser(user: User, updateUserDto: UpdateUserDto): Promise<TUser> {
		const { email, username } = updateUserDto;
		if (updateUserDto.password) {
			updateUserDto.password = this.hashService.getHash(updateUserDto.password);
		}

		const isExist = !!(await this.userRepository.findOne({
			where: [{ email }, { username }],
		}));

		if (isExist) {
			throw new ConflictException(
				'Пользователь с таким email или username уже зарегистрирован',
			);
		}

		const updateUserInfo = await this.findUserInfo('id', user.id);
		Object.assign(updateUserInfo, updateUserDto);
		const { password, ...newUser } = updateUserInfo;
		return await this.userRepository.save(newUser);
	}

	async findUserInfo(key: string | number, param: any): Promise<User> {
		return await this.userRepository.findOneBy({ [key]: param })
	}

	async findUserName(userName: string): Promise<User> {
		return await this.userRepository.findOne({
			where: {
				username: userName
			}
		})
	}

	async findUserEmail(userEmail: string): Promise<User> {
		return await this.userRepository.findOneBy({ email: userEmail })
	}

	async findOrders(userId: number): Promise<Order[]> {
		const orders = await this.orderRepository.findBy({
			user: {id: userId}
		})
		return orders;
	}

	async findBasket(userid: number): Promise<Basket[]> {
		const basket = await this.basketRepository.findBy({
			user: {id: userid}
		})
		return basket
	}
}