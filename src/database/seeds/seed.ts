import { NestFactory } from '@nestjs/core';
import { DataSource } from 'typeorm';
import { AppModule } from '../../app.module';
import { Order } from '../../orders/entities/orders.entity';
import { OrderStatus } from '../../orders/enums/order_status.enum';
import { Payment } from '../../payments/entities/payments.entity';
import { User } from '../../user/entities/user.entity';

const userSeeds = [
  {
    firstName: 'John',
    lastName: 'Smith',
    email: 'john.smith@example.com',
    phone: '0400000001',
  },
  {
    firstName: 'Emily',
    lastName: 'Brown',
    email: 'emily.brown@example.com',
    phone: '0400000002',
  },
  {
    firstName: 'Michael',
    lastName: 'Wilson',
    email: 'michael.wilson@example.com',
    phone: '0400000003',
  },
  {
    firstName: 'Sophia',
    lastName: 'Taylor',
    email: 'sophia.taylor@example.com',
    phone: '0400000004',
  },
  {
    firstName: 'Daniel',
    lastName: 'Lee',
    email: 'daniel.lee@example.com',
    phone: '0400000005',
  },
  {
    firstName: 'Olivia',
    lastName: 'Martin',
    email: 'olivia.martin@example.com',
    phone: '0400000006',
  },
  {
    firstName: 'James',
    lastName: 'Anderson',
    email: 'james.anderson@example.com',
    phone: '0400000007',
  },
  {
    firstName: 'Ava',
    lastName: 'Thomas',
    email: 'ava.thomas@example.com',
    phone: '0400000008',
  },
  {
    firstName: 'Noah',
    lastName: 'Robinson',
    email: 'noah.robinson@example.com',
    phone: '0400000009',
  },
  {
    firstName: 'Mia',
    lastName: 'Clark',
    email: 'mia.clark@example.com',
    phone: '0400000010',
  },
  {
    firstName: 'Lucas',
    lastName: 'Walker',
    email: 'lucas.walker@example.com',
    phone: '0400000011',
  },
] as const;

const orderSeeds = [
  {
    orderNumber: 'ORD-2026-0001',
    totalAmount: '1299.00',
    status: OrderStatus.Completed,
    userEmail: 'john.smith@example.com',
  },
  {
    orderNumber: 'ORD-2026-0002',
    totalAmount: '89.50',
    status: OrderStatus.Delivered,
    userEmail: 'emily.brown@example.com',
  },
  {
    orderNumber: 'ORD-2026-0003',
    totalAmount: '249.99',
    status: OrderStatus.Pending,
    userEmail: 'michael.wilson@example.com',
  },
  {
    orderNumber: 'ORD-2026-0004',
    totalAmount: '45.00',
    status: OrderStatus.Failed,
    userEmail: 'sophia.taylor@example.com',
  },
  {
    orderNumber: 'ORD-2026-0005',
    totalAmount: '560.25',
    status: OrderStatus.Completed,
    userEmail: 'daniel.lee@example.com',
  },
  {
    orderNumber: 'ORD-2026-0006',
    totalAmount: '120.00',
    status: OrderStatus.Delivered,
    userEmail: 'olivia.martin@example.com',
  },
  {
    orderNumber: 'ORD-2026-0007',
    totalAmount: '78.90',
    status: OrderStatus.Pending,
    userEmail: 'james.anderson@example.com',
  },
  {
    orderNumber: 'ORD-2026-0008',
    totalAmount: '999.95',
    status: OrderStatus.Completed,
    userEmail: 'ava.thomas@example.com',
  },
  {
    orderNumber: 'ORD-2026-0009',
    totalAmount: '19.99',
    status: OrderStatus.Completed,
    userEmail: 'john.smith@example.com',
  },
  {
    orderNumber: 'ORD-2026-0010',
    totalAmount: '75.00',
    status: OrderStatus.Failed,
    userEmail: 'john.smith@example.com',
  },
  {
    orderNumber: 'ORD-2026-0011',
    totalAmount: '150.00',
    status: OrderStatus.Failed,
    userEmail: 'emily.brown@example.com',
  },
  {
    orderNumber: 'ORD-2026-0012',
    totalAmount: '100.00',
    status: OrderStatus.Completed,
    userEmail: 'daniel.lee@example.com',
  },
  {
    orderNumber: 'ORD-2026-0013',
    totalAmount: '200.00',
    status: OrderStatus.Delivered,
    userEmail: 'daniel.lee@example.com',
  },
  {
    orderNumber: 'ORD-2026-0014',
    totalAmount: '30.00',
    status: OrderStatus.Completed,
    userEmail: 'sophia.taylor@example.com',
  },
  {
    orderNumber: 'ORD-2026-0015',
    totalAmount: '310.00',
    status: OrderStatus.Pending,
    userEmail: 'mia.clark@example.com',
  },
  {
    orderNumber: 'ORD-2026-0016',
    totalAmount: '60.00',
    status: OrderStatus.Failed,
    userEmail: 'lucas.walker@example.com',
  },
] as const;

const paymentSeeds = [
  {
    orderNumber: 'ORD-2026-0001',
    paymentMethod: 'credit_card',
    amount: '1299.00',
    paymentStatus: 'paid',
    paidAt: new Date('2026-07-16T01:30:00Z'),
  },
  {
    orderNumber: 'ORD-2026-0002',
    paymentMethod: 'paypal',
    amount: '89.50',
    paymentStatus: 'paid',
    paidAt: new Date('2026-07-16T02:15:00Z'),
  },
  {
    orderNumber: 'ORD-2026-0003',
    paymentMethod: 'bank_transfer',
    amount: '249.99',
    paymentStatus: 'pending',
  },
  {
    orderNumber: 'ORD-2026-0004',
    paymentMethod: 'credit_card',
    amount: '45.00',
    paymentStatus: 'failed',
  },
  {
    orderNumber: 'ORD-2026-0005',
    paymentMethod: 'apple_pay',
    amount: '560.25',
    paymentStatus: 'paid',
    paidAt: new Date('2026-07-17T04:20:00Z'),
  },
  {
    orderNumber: 'ORD-2026-0006',
    paymentMethod: 'debit_card',
    amount: '120.00',
    paymentStatus: 'paid',
    paidAt: new Date('2026-07-17T05:45:00Z'),
  },
  {
    orderNumber: 'ORD-2026-0007',
    paymentMethod: 'paypal',
    amount: '78.90',
    paymentStatus: 'pending',
  },
  {
    orderNumber: 'ORD-2026-0008',
    paymentMethod: 'bank_transfer',
    amount: '999.95',
    paymentStatus: 'paid',
    paidAt: new Date('2026-07-18T07:10:00Z'),
  },
  {
    orderNumber: 'ORD-2026-0009',
    paymentMethod: 'gift_card',
    amount: '19.99',
    paymentStatus: 'paid',
    paidAt: new Date('2026-07-18T08:20:00Z'),
  },
  {
    orderNumber: 'ORD-2026-0010',
    paymentMethod: 'credit_card',
    amount: '75.00',
    paymentStatus: 'failed',
  },
  {
    orderNumber: 'ORD-2026-0011',
    paymentMethod: 'debit_card',
    amount: '150.00',
    paymentStatus: 'failed',
  },
  {
    orderNumber: 'ORD-2026-0012',
    paymentMethod: 'apple_pay',
    amount: '100.00',
    paymentStatus: 'paid',
    paidAt: new Date('2026-07-18T09:40:00Z'),
  },
  {
    orderNumber: 'ORD-2026-0013',
    paymentMethod: 'paypal',
    amount: '200.00',
    paymentStatus: 'paid',
    paidAt: new Date('2026-07-18T10:10:00Z'),
  },
  {
    orderNumber: 'ORD-2026-0014',
    paymentMethod: 'bank_transfer',
    amount: '30.00',
    paymentStatus: 'paid',
    paidAt: new Date('2026-07-18T11:25:00Z'),
  },
  {
    orderNumber: 'ORD-2026-0016',
    paymentMethod: 'credit_card',
    amount: '60.00',
    paymentStatus: 'failed',
  },
] as const;

async function seed(): Promise<void> {
  if (process.env.NODE_ENV === 'production') {
    throw new Error('Database seeding is disabled in production.');
  }

  const app = await NestFactory.createApplicationContext(AppModule);

  try {
    const dataSource = app.get(DataSource);
    const inserted = { users: 0, orders: 0, payments: 0 };

    await dataSource.transaction(async (manager) => {
      const userRepository = manager.getRepository(User);
      const orderRepository = manager.getRepository(Order);
      const paymentRepository = manager.getRepository(Payment);
      const usersByEmail = new Map<string, User>();
      const ordersByNumber = new Map<string, Order>();

      for (const userSeed of userSeeds) {
        let user = await userRepository.findOneBy({ email: userSeed.email });

        if (!user) {
          user = await userRepository.save(userRepository.create(userSeed));
          inserted.users += 1;
        }

        usersByEmail.set(user.email, user);
      }

      for (const orderSeed of orderSeeds) {
        let order = await orderRepository.findOneBy({
          orderNumber: orderSeed.orderNumber,
        });

        if (!order) {
          const user = usersByEmail.get(orderSeed.userEmail);

          if (!user) {
            throw new Error(`Seed user ${orderSeed.userEmail} was not found.`);
          }

          order = await orderRepository.save(
            orderRepository.create({
              orderNumber: orderSeed.orderNumber,
              totalAmount: orderSeed.totalAmount,
              status: orderSeed.status,
              user,
            }),
          );
          inserted.orders += 1;
        }

        ordersByNumber.set(order.orderNumber, order);
      }

      for (const paymentSeed of paymentSeeds) {
        const order = ordersByNumber.get(paymentSeed.orderNumber);

        if (!order) {
          throw new Error(
            `Seed order ${paymentSeed.orderNumber} was not found.`,
          );
        }

        const existingPayment = await paymentRepository.findOne({
          where: { order: { id: order.id } },
        });

        if (!existingPayment) {
          await paymentRepository.save(
            paymentRepository.create({
              paymentMethod: paymentSeed.paymentMethod,
              amount: paymentSeed.amount,
              paymentStatus: paymentSeed.paymentStatus,
              paidAt: 'paidAt' in paymentSeed ? paymentSeed.paidAt : undefined,
              order,
            }),
          );
          inserted.payments += 1;
        }
      }
    });

    console.log(
      `Seed complete: ${inserted.users} users, ${inserted.orders} orders, ${inserted.payments} payments inserted.`,
    );
  } finally {
    await app.close();
  }
}

void seed().catch((error: unknown) => {
  console.error('Seed failed:', error);
  process.exitCode = 1;
});
