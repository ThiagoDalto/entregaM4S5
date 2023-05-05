import { PrimaryGeneratedColumn, Entity, Column, OneToOne } from "typeorm";
import { v4 as uuid } from "uuid";

@Entity("addresses")
export class Address {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({
    length: 250,
  })
  district: string;

  @Column({
    length: 8,
  })
  zipCode: string;

  @Column({
    length: 10,
  })
  number: string;

  @Column({
    length: 75,
  })
  city: string;

  @Column({
    length: 2,
  })
  state: string;

 
}
