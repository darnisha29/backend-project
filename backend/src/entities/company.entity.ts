import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Product } from "./product.entity";

@Entity({name:'company_data'})
export class Company{
    @PrimaryGeneratedColumn()
    company_id:number;

    @Column()
    name:string;

    @OneToMany(()=>Product,product=>product.company)
    product:Product[]
}