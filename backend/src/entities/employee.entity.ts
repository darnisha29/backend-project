import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { Base } from "./base.entity";

@Entity({ name: 'employee_data' })
export class Employee extends Base{
    @Column()
    email: string;

    @Column()
    firstName:string

    @Column()
    lastName:string

    @Column()
    password: string;

    @Column()
    role: string;
}