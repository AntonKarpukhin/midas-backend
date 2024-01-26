import { PartialType } from '@nestjs/swagger';
import { CreateDishOrderDto } from './create-dish-order.dto';

export class UpdateDishOrderDto extends PartialType(CreateDishOrderDto) {}
