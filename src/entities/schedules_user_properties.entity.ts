import {
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  Entity,
  CreateDateColumn,
} from "typeorm";
import { IPropertyRequest } from "../interfaces/properties";
import { Property } from "./properties.entity";
import { User } from "./user.entity";

@Entity("schedules")
export class Schedule {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ type: "date" })
  date: Date;

  @Column({ type: "time" })
  hour: Date;

  @ManyToOne(() => Property, { eager: true })
  property: Property;

  @ManyToOne(() => User, { eager: true })
  user: User;
}
