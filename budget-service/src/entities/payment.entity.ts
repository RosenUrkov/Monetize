import { Budget } from './budget.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { PaymentDetails } from './payment-details.entity';

@Entity('payments')
export class Payment {
  @PrimaryGeneratedColumn('increment')
  public id: number;

  @Column('decimal', { precision: 15, scale: 2, nullable: false, default: 0 })
  public value: string;

  @ManyToOne(() => Budget, (budget) => budget.payments, {
    nullable: false,
    onDelete: 'CASCADE',
  })
  public budget: Budget;

  @ManyToOne(() => PaymentDetails, (details) => details.payments, {
    nullable: false,
    eager: true,
  })
  public details: PaymentDetails;
}
