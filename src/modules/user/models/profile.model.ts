import {
  Entity,
  Column,
  BaseEntity,
  ObjectIdColumn,
  ObjectID,
  Index,
  OneToOne
} from 'typeorm';
import { UserModel } from './user.model';
export enum Gender {
  MALE = 'male',
  FEMALE = 'female',
  UNKNOWN = 'unknown'
}
@Entity()
export class ProfileModel extends BaseEntity {
  @ObjectIdColumn()
  public id: ObjectID;

  @Column()
  @Index({ unique: true })
  public ci: string;

  @Column()
  public firstName: string;

  @Column({ nullable: true })
  public lastName: string;

  @Column({
    type: 'enum',
    enum: Gender,
    default: Gender.UNKNOWN
  })
  public gender: string;

  @Column({ type: 'date', nullable: true })
  public birthday: Date;

  @Column({ nullable: true })
  public photo: string;

  @OneToOne(
    type => UserModel,
    user => user.profile,
  )
  public user: UserModel;
}
