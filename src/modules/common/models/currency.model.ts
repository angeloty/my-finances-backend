import { Entity, PrimaryGeneratedColumn, Column, ObjectID, BaseEntity, Index, ManyToOne, OneToMany } from 'typeorm';

@Entity()
export class CurrencyModel extends BaseEntity {

  @PrimaryGeneratedColumn()
  public id: ObjectID;

  @Column()
  public symbol: string;

  @Column({ length: 2, type: 'varchar' })
  @Index({ unique: true })
  public codeIso2: string;

  @Column({ length: 3, type: 'varchar' })
  @Index({ unique: true })
  public codeIso3: string;

  @Column()
  public name: string;

  @Column({ type: 'decimal', precision: 6, scale: 6 })
  public exchangeRateOutcome: number;

  @Column({ type: 'decimal', precision: 6, scale: 6 })
  public exchangeRateIncome: number;

  @ManyToOne(type => CurrencyModel, currency => currency.children)
  public parent: CurrencyModel;

  @OneToMany(type => CurrencyModel, currency => currency.parent)
  public children: CurrencyModel[];

}
