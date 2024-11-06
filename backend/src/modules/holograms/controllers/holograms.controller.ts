import { Controller, Get, Post, Put, Delete, Body, Param } from '@nestjs/common';
import { HologramsService } from '../services/holograms.service';
import { CreateHologramDto, UpdateHologramDto } from '../dtos/base-hologram.dto';

@Controller('holograms')
export class HologramsController {
  constructor(private readonly hologramsService: HologramsService) {}

  @Get()
  findAll() {
    return this.hologramsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.hologramsService.findOne(+id);
  }

  @Post()
  create(@Body() createHologramDto: CreateHologramDto) {
    return this.hologramsService.create(createHologramDto);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateHologramDto: UpdateHologramDto) {
    return this.hologramsService.update(+id, updateHologramDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.hologramsService.remove(+id);
  }
}
