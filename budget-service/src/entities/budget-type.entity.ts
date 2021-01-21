import { Budget } from './budget.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity('budget-types')
export class BudgetType {
  @PrimaryGeneratedColumn('increment')
  public id: number;

  @Column({ nullable: false })
  public name: string;

  @OneToMany(() => Budget, (budget) => budget.type, {
    nullable: false,
  })
  public budgets: Budget[];
}
