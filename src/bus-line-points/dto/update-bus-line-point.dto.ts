import { PartialType } from '@nestjs/swagger';
import { CreateBusLinePointDto } from './create-bus-line-point.dto';

export class UpdateBusLinePointDto extends PartialType(CreateBusLinePointDto) {}
