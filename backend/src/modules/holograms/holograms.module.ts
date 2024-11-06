import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Hologram } from './entities/hologram.entity';
import { HologramsService } from './services/holograms.service';
import { HologramsController } from './controllers/holograms.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Hologram])],
  controllers: [HologramsController],
  providers: [HologramsService],
  exports: [HologramsService],
})
export class HologramsModule {}
