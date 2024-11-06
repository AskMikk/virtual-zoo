import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Hologram {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column('float')
  weight: number;

  @Column()
  superpower: string;

  @Column('date', { nullable: true })
  extinctSince: Date;
}
