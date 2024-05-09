import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
} from 'typeorm';

@Entity({ name: 'product' })
export class Product {
  @PrimaryGeneratedColumn() 
  id?: number;

  @Column({ type: 'varchar', length: 255 }) 
  name?: string;

  @Column({ type: 'int' }) 
  price?: number;
}


