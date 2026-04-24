import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { BusLocationsService } from './bus-locations.service';
import { CreateBusLocationDto } from './dto/create-bus-location.dto';
import { UpdateBusLocationDto } from './dto/update-bus-location.dto';

@Controller('bus-locations')
export class BusLocationsController {
  constructor(private readonly busLocationsService: BusLocationsService) {}

  @Post()
  create(@Body() createBusLocationDto: CreateBusLocationDto) {
    return this.busLocationsService.create(createBusLocationDto);
  }

  @Get()
  findAll() {
    return this.busLocationsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.busLocationsService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateBusLocationDto: UpdateBusLocationDto,
  ) {
    return this.busLocationsService.update(+id, updateBusLocationDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.busLocationsService.remove(+id);
  }
}
