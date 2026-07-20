import { Payment } from '../../payments/entities/payments.entity';
import { User } from '../../user/entities/user.entity';
import { Entity, Column, CreateDateColumn, PrimaryGeneratedColumn,ManyToOne, JoinColumn, OneToOne } from 'typeorm';
import { OrderStatus } from '../enums/order_status.enum';


@Entity('orders')
export class Order {
    @PrimaryGeneratedColumn('uuid')
    id!: string;

    @Column({
        type: 'varchar',
        name: 'order_number',
        length: 50,
        unique:true,
    })
    orderNumber!: string;

    @Column({
        type: 'decimal',
        precision:12,
        scale:2,
        name: 'total_amount',
    })
    totalAmount!: string;

    @Column({
        type: 'varchar',
        length: 20,
    })
    status!: OrderStatus;

    @CreateDateColumn({
        type: 'timestamp',
        name: 'created_at',
    })
    createdAt!: Date;


    @ManyToOne(()=> User, (user)=> user.orders,{
        nullable:false
    })
    @JoinColumn({
        name:'user_id',
    })
    user!:User;



    @OneToOne(()=> Payment, (payment)=> payment.order)
    payment?:Payment;

}