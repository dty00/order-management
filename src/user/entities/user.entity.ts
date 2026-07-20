import { Order } from '../../orders/entities/orders.entity';
import { Entity, Column, CreateDateColumn, PrimaryGeneratedColumn, OneToMany } from 'typeorm';

@Entity('users')
export class User {
    @PrimaryGeneratedColumn('uuid')
    id!: string;

    @Column({
        type: 'varchar',
        name: 'first_name',
        length: 50,
    })
    firstName!: string;

    @Column({
        type: 'varchar',
        length: 50,
        name: 'last_name',
    })
    lastName!: string;

    @Column({
        type: 'varchar',
        length: 100,
        unique: true,
    })
    email!: string;

    @Column({
        type: 'varchar',
        length: 20,
        unique: true,
    })
    phone!: string;

    @CreateDateColumn({
        type: 'timestamp',
        name: 'created_at',
    })
    createdAt!: Date;

    @OneToMany(()=> Order, (order)=> order.user)
    orders!:Order[];

}