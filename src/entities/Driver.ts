import { Column, Entity, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./User";

@Entity("drive")
export class Driver {
    @PrimaryGeneratedColumn()
    id: number

    @Column({length: 20})
    document: string

    @OneToOne(() => User, (user) => user.driver)
    user_id: number
}