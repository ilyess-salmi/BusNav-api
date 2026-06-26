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
import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';

@Controller('bus-lines')
export class BusLinesController {
  constructor(private readonly busLinesService: BusLinesService) {}

  @Post()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
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
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  remove(@Param('id') id: string) {
    return this.busLinesService.remove(+id);
  }
}
