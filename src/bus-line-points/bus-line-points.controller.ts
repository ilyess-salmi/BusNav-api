import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe } from '@nestjs/common';
import { BusLinePointsService } from './bus-line-points.service';
import { CreateBusLinePointDto } from './dto/create-bus-line-point.dto';
import { UpdateBusLinePointDto } from './dto/update-bus-line-point.dto';
import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';

@Controller('bus-line-points')
export class BusLinePointsController {
  constructor(private readonly busLinePointsService: BusLinePointsService) {}

  @Post()
  create(@Body() createBusLinePointDto: CreateBusLinePointDto) {
    return this.busLinePointsService.create(createBusLinePointDto);
  }

  @Get()
  findAll() {
    return this.busLinePointsService.findAll();
  }

  // @Get(':idLine')
  // findOne(@Param('id') id: string) {
  //   return this.busLinePointsService.findOne(+id);
  // }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateBusLinePointDto: UpdateBusLinePointDto,
  ) {
    return this.busLinePointsService.update(+id, updateBusLinePointDto);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  remove(@Param('id') id: string) {
    return this.busLinePointsService.remove(+id);
  }

  @Get(':lineId')
  findByLine(@Param('lineId', ParseIntPipe) lineId: number) {
    return this.busLinePointsService.findByLine(lineId);
  }
}
