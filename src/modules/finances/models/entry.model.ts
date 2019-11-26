import { ObjectIdColumn, Column, ObjectID, ManyToOne, JoinColumn, BaseEntity, Index } from 'typeorm';
import { CurrencyModel } from '../../common/models/currency.model';

export class EntryModel extends BaseEntity {
  @ObjectIdColumn()
  public id: ObjectID;

  @Column()
  public name: string;

  @Column()
  public note: string;

  @Column()
  public amount: number;

  @Column()
  @Index({ unique: true })
  public slug: string;

  @ManyToOne(type => CurrencyModel)
  @JoinColumn({ name: 'currency_id', referencedColumnName: 'id' })
  public currency: CurrencyModel;
}
