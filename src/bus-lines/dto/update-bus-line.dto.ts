import { PartialType } from '@nestjs/mapped-types';
import { CreateBusLineDto } from './create-bus-line.dto';

export class UpdateBusLineDto extends PartialType(CreateBusLineDto) {}
