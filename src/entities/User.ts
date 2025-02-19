import {Column, Entity, ManyToOne, PrimaryGeneratedColumn} from "typeorm"
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

  @Column({length: 20, nullable: false})
  password: string

  @Column({ type: "enum", nullable: false, enum: ProfileEnum })
  profile: ProfileEnum

  @ManyToOne(() => Driver, (driver) => driver.user_id)
  driver: Driver[]
}