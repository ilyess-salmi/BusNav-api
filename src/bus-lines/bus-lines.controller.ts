import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { BusLinesService } from './bus-lines.service';
import { CreateBusLineDto } from './dto/create-bus-line.dto';
import { UpdateBusLineDto } from './dto/update-bus-line.dto';

@Controller('bus-lines')
export class BusLinesController {
  constructor(private readonly busLinesService: BusLinesService) {}

  @Post()
  create(@Body() createBusLineDto: CreateBusLineDto) {
    return this.busLinesService.create(createBusLineDto);
  }

  @Get()
  findAll() {
    return this.busLinesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.busLinesService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateBusLineDto: UpdateBusLineDto) {
    return this.busLinesService.update(+id, updateBusLineDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.busLinesService.remove(+id);
  }
}
