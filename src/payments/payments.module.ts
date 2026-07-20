import { Module } from '@nestjs/common';
import { PaymentsController } from './payments.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Payment } from './entities/payments.entity';
import { PaymentsService } from './payments.service';

@Module({
  imports:[
    TypeOrmModule.forFeature([Payment]),
  ],
  controllers: [PaymentsController],
  providers:[PaymentsService]
})

export class PaymentsModule {}
