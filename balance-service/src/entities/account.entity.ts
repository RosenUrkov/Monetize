import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Payment } from './payment.entity';

@Entity('accounts')
export class Account {
  @PrimaryGeneratedColumn('increment')
  public id: string;

  @Column({ nullable: false })
  public type: string;

  @OneToMany(() => Payment, (payment) => payment.account)
  public payments: Payment[];
}
