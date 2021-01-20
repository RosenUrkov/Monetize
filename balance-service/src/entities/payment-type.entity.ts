import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { PaymentDetails } from './payment-details.entity';
import { Payment } from './payment.entity';

@Entity('payment-types')
export class PaymentType {
  @PrimaryGeneratedColumn('increment')
  public id: number;

  @Column({ nullable: false })
  public name: string;

  @OneToMany(() => PaymentDetails, (details) => details.type, {
    nullable: false,
  })
  public details: PaymentDetails[];
}
