import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { Property } from "./properties.entity";

@Entity("categories")
export class Category {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ unique: true, length: 75 })
  name: string;

  @OneToMany(() => Property, (property) => property.category)
  property: Property[];
}
