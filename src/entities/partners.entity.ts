import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { IsEmail } from 'class-validator';

export enum enumPartners {
  ACTIVATE = 'Activate',
  DEACTIVATE = 'Deactivate',
}

@Entity({ name: 'partners' })
export class PartnersEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  username: string;

  @Column()
  @IsEmail()
  email: string;

  @CreateDateColumn()
  date = new Date();

  @Column({
    type: 'enum',
    enum: enumPartners,
  })
  partnersEvent: enumPartners;
}
