import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';

export enum enumEvent {
  LOGIN = 'Login',
  REGISTRATION = 'Registration',
}

@Entity({ name: 'logs' })
export class LogsEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  username: string;

  @CreateDateColumn({ type: 'datetime' })
  date = new Date();

  @Column({
    type: 'enum',
    enum: enumEvent,
  })
  event: enumEvent;
}
