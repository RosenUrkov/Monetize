import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn('increment')
  public id: string;

  @Column({ nullable: false, unique: true, length: 50 })
  public username: string;

  @Column({ nullable: false })
  public password: string;
}
