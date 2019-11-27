import { Entity, PrimaryGeneratedColumn, Column, BaseEntity, Index, ManyToOne, OneToMany } from 'typeorm';

@Entity()
export class CurrencyModel extends BaseEntity {

  @PrimaryGeneratedColumn()
  public id: number;

  @Column()
  public symbol: string;

  @Column({ length: 2, type: 'varchar' })
  @Index({ unique: true, expireAfterSeconds: 3600 })
  public codeIso2: string;

  @Column({ length: 3, type: 'varchar' })
  @Index({ unique: true, expireAfterSeconds: 3600 })
  public codeIso3: string;

  @Column()
  public name: string;

  @Column({ type: 'decimal', precision: 13, scale: 4 })
  public exchangeRateOutcome: number;

  @Column({ type: 'decimal', precision: 13, scale: 4 })
  public exchangeRateIncome: number;

  @ManyToOne(type => CurrencyModel, currency => currency.children)
  public parent: CurrencyModel;

  @OneToMany(type => CurrencyModel, currency => currency.parent)
  public children: CurrencyModel[];

}
