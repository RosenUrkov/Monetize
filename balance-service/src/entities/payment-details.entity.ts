import { Payment } from './payment.entity';
import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { PaymentType } from './payment-type.entity';

@Entity('payment-details')
export class PaymentDetails {
  @PrimaryGeneratedColumn('increment')
  public id: number;

  @Column({ nullable: false })
  public category: string;

  @ManyToOne(() => PaymentType, (type) => type.name, {
    nullable: false,
    eager: true,
  })
  public type: PaymentType;

  @OneToMany(() => Payment, (payment) => payment.details, {
    nullable: false,
  })
  public payments: Payment[];
}
