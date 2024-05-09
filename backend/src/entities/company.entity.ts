import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Product } from "./product.entity";
import { Base } from "./base.entity";

@Entity({name:'company_data'})
export class Company extends Base{
    @Column()
    name:string;

    @OneToMany(()=>Product,product=>product.company)
    product:Product[]
}