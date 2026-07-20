import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Order } from './entities/orders.entity';
import { Repository } from 'typeorm';

// enum Category {
//     Electronics = 'Electronics',
//     Clothing = 'Clothing',
//     Food = 'Food',
//     Books = 'Books'
// }

// export interface Order{
//     id:string;
//     userId:string;
//     customer:string;
//     category:Category;
//     product:string;
//     quantity:number;
//     status:OrderStatus;
// }


@Injectable()
export class OrdersService {

    // private readonly orders: Order[] = [
    //         {
    //   id: 'order-001',
    //   userId: 'user-001',
    //   customer: 'John',
    //   category: Category.Electronics,
    //   product: 'Laptop',
    //   quantity: 1,
    //   status: 'pending',
    // },
    // {
    //   id: 'order-002',
    //   userId: 'user-002',
    //   customer: 'Alice',
    //   category: Category.Books,
    //   product: 'NestJS Book',
    //   quantity: 2,
    //   status: 'delivered',
    // },
    // ];
    constructor(
        @InjectRepository(Order)
        private readonly orderRepository:
        Repository<Order>,
    ){}

    
    getOrderList(): Promise<Order[]> {
        return this.orderRepository.find();
    }

    async getOrderById(id:string): Promise<Order>{

        const order = await this.orderRepository.findOneBy({id});

        if(!order){
            throw new NotFoundException(`Order with id ${id} was not found`);
        
        }
        return order;
    }
}
