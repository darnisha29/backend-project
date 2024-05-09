import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: 'employee_data' })
export class Employee {

    @PrimaryGeneratedColumn()
    id: number;

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