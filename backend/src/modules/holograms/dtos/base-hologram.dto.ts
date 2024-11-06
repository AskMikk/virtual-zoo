import { IsDate, IsNumber, Min } from "class-validator";
import { IsString, Length } from "class-validator";
import { IsOptional } from "class-validator";
import { PartialType } from '@nestjs/mapped-types';


export class BaseHologramDto {
    @IsString()
    @Length(2, 100)
    name: string;
  
    @IsNumber()
    @Min(0)
    weight: number;
  
    @IsString()
    @Length(2, 100)
    superpower: string;
  
    @IsOptional()
    @IsDate()
    extinctSince?: Date;
  }
  
  export class CreateHologramDto extends BaseHologramDto {}
  
  export class UpdateHologramDto extends PartialType(BaseHologramDto) {}