import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Account } from './account.entity';
import { PaymentCategory } from './payment-category.entity';

@Entity('payments')
export class Payment {
  @PrimaryGeneratedColumn('increment')
  public id: string;

  @Column({ nullable: false })
  public userId: string;

  @Column('decimal', { precision: 15, scale: 2, nullable: false, default: 0 })
  public value: number;

  @Column({ nullable: false })
  public type: string;

  @ManyToOne(() => PaymentCategory, (category) => category.payments)
  public category: PaymentCategory;

  @ManyToOne(() => Account, (account) => account.payments)
  public account: Account;
}
