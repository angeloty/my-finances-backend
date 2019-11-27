import { PrimaryGeneratedColumn, Column, ObjectID, ManyToOne, JoinColumn, BaseEntity, Index } from 'typeorm';
import { CurrencyModel } from '../../common/models/currency.model';
import { UserModel } from '../../user/models/user.model';

export class EntryModel extends BaseEntity {
  @PrimaryGeneratedColumn()
  public id: number;

  @Column()
  public name: string;

  @Column()
  public note: string;

  @Column()
  public amount: number;

  @Column()
  @Index({ unique: true, expireAfterSeconds: 3600 })
  public slug: string;

  @ManyToOne(type => CurrencyModel)
  @JoinColumn({ name: 'currency_id', referencedColumnName: 'id' })
  public currency: CurrencyModel;

  @ManyToOne(type => UserModel)
  @JoinColumn({ name: 'owner_id', referencedColumnName: 'id' })
  public owner: UserModel;
}
