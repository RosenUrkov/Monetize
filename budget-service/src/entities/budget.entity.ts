import {
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  OneToMany,
} from 'typeorm';
import { BudgetType } from './budget-type.entity';
import { Payment } from './payment.entity';

@Entity('budgets')
export class Budget {
  @PrimaryGeneratedColumn('increment')
  public id: number;

  @Column({ nullable: false })
  public userId: number;

  @ManyToOne(() => BudgetType, (type) => type.budgets, {
    nullable: false,
    eager: true,
  })
  public type: BudgetType;

  @OneToMany(() => Payment, (payment) => payment.budget, {
    nullable: false,
    eager: true,
    cascade: true,
  })
  public payments: Payment[];
}
