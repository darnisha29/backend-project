import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Company } from "./company.entity";

@Entity({name:'product_data'})
export class Product {

    @PrimaryGeneratedColumn()
    product_id: number

    @Column()
    product_name: string

    @Column()
    product_category: string
    
    @Column()
    product_price: string

    @ManyToOne(()=>Company,(company)=>company.product)
    @JoinColumn({name:'company_id'})
    company:Company
}