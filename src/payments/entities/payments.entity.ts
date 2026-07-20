import { Order } from '../../orders/entities/orders.entity';
import { Entity, Column, CreateDateColumn, PrimaryGeneratedColumn, OneToOne, JoinColumn } from 'typeorm';


@Entity('payments')
export class Payment {
    @PrimaryGeneratedColumn('uuid')
    id!: string;

    @Column({
        type: 'varchar',
        name: 'payment_method',
        length: 30,
    })
    paymentMethod!: string;

    @Column({
        type: 'decimal',
        precision:12,
        scale:2,
    })
    amount!: string;

    @Column({
        type: 'varchar',
        length: 20,
        name:'payment_status'
    })
    paymentStatus!: string;

    @Column({
        type: 'timestamp',
        name: 'paid_at',
        nullable: true,
    })
    paidAt?: Date;

    @OneToOne(()=> Order, (order)=> order.payment,{
        nullable:false,
        onDelete:'CASCADE',
    })
    @JoinColumn({
        name:'order_id',
    })
    order!:Order;



}