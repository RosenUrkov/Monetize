import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn('increment')
  public id: number;

  @Column({ nullable: false, unique: true, length: 20 })
  public username: string;

  @Column({ nullable: false })
  public password: string;
}
