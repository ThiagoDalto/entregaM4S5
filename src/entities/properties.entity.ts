import {
  PrimaryGeneratedColumn,
  Entity,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToOne,
  OneToMany,
  JoinColumn,
  ManyToOne,
} from "typeorm";
//import { v4 as uuid} from "uuid";
import { IAddressRequest } from "../interfaces/properties";
import { Address } from "./addresses.entity";
import { Category } from "./categories.entity";
import { Schedule } from "./schedules_user_properties.entity";

@Entity("properties")
export class Property {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ type: "boolean", default: false })
  sold: boolean;

  @Column("decimal", { precision: 12, scale: 2, default: 0 })
  value: number;

  @Column({ type: "integer" })
  size: number;

  @CreateDateColumn({ type: "date" })
  createdAt: Date;

  @UpdateDateColumn({ type: "date" })
  updatedAt: Date;

  @OneToOne(() => Address, (property) => Property, {
    eager: true,
    cascade: true,
  })
  @JoinColumn()
  address: IAddressRequest;

  @OneToMany(() => Schedule, (schedule) => schedule.property)
  schedule: Schedule[];

  @ManyToOne(() => Category, { eager: true })
  category: Category;
}
