import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Hologram } from '../entities/hologram.entity';
import {
  CreateHologramDto,
  UpdateHologramDto,
} from '../dtos/base-hologram.dto';

@Injectable()
export class HologramsService {
  constructor(
    @InjectRepository(Hologram)
    private hologramsRepository: Repository<Hologram>,
  ) {}

  findAll(): Promise<Hologram[]> {
    return this.hologramsRepository.find();
  }

  async findOne(id: number): Promise<Hologram> {
    const hologram = await this.hologramsRepository.findOneBy({ id });
    if (!hologram) {
      throw new NotFoundException(`Hologram with ID ${id} not found`);
    }
    return hologram;
  }

  create(createHologramDto: CreateHologramDto): Promise<Hologram> {
    return this.hologramsRepository.save(createHologramDto);
  }

  async update(
    id: number,
    updateHologramDto: UpdateHologramDto,
  ): Promise<Hologram> {
    await this.hologramsRepository.update(id, updateHologramDto);
    return this.findOne(id);
  }

  async remove(id: number): Promise<void> {
    await this.hologramsRepository.delete(id);
  }
}
