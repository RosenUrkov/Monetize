import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Account } from './account.entity';
import { PaymentDetails } from './payment-details.entity';

@Entity('payments')
export class Payment {
  @PrimaryGeneratedColumn('increment')
  public id: number;

  @Column({ nullable: false })
  public userId: number;

  @Column('decimal', { precision: 15, scale: 2, nullable: false, default: 0 })
  public value: string;

  @Column('date', { nullable: false })
  public date: string;

  @ManyToOne(() => PaymentDetails, (details) => details.payments, {
    nullable: false,
    eager: true,
  })
  public details: PaymentDetails;

  @ManyToOne(() => Account, (account) => account.payments, {
    nullable: false,
    eager: true,
  })
  public account: Account;
}
