import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Payment } from './payment.entity';

@Entity('payment-categories')
export class PaymentCategory {
  @PrimaryGeneratedColumn('increment')
  public id: string;

  @Column({ nullable: false })
  public category: string;

  @OneToMany(() => Payment, (payment) => payment.category)
  public payments: Payment[];
}
