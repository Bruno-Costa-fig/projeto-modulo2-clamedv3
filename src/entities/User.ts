import {Column, Entity, ManyToOne, OneToOne, PrimaryGeneratedColumn} from "typeorm"
import { Driver } from "./Driver"

export enum ProfileEnum {
  ADMIN,
  DRIVER,
  BRANCH
}

@Entity("users")
export class User {
  @PrimaryGeneratedColumn()
  id: number

  @Column({length: 255, nullable: false})
  name: string

  @Column({length: 150, nullable: false})
  password: string

  @Column({ type: "enum", nullable: false, enum: ProfileEnum })
  profile: ProfileEnum

  @OneToOne(() => Driver, (driver) => driver.user_id)
  driver: Driver
}