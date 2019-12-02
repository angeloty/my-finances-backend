import {
  Entity,
  Column,
  BaseEntity,
  PrimaryGeneratedColumn,
  Index,
  OneToOne,
  JoinColumn,
  CreateDateColumn
} from 'typeorm';
import { UserModel } from './user.model';
export enum Gender {
  MALE = 'male',
  FEMALE = 'female',
  UNKNOWN = 'unknown'
}
@Entity()
export class ProfileModel extends BaseEntity {
  @PrimaryGeneratedColumn()
  public id: number;

  @Column()
  @Index({ unique: true, expireAfterSeconds: 3600 })
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
    user => user.profile
  )
  @JoinColumn()
  public user: UserModel;

  public toObject() {
    const user = this.user;
    if (user && user.profile) {
      delete user.profile;
    }
    return {
      user,
      id: this.id,
      firstName: this.firstName,
      lastName: this.lastName,
      ci: this.ci,
      gender: this.gender,
      birthday: this.birthday,
      photo: this.photo
    };
  }

  public toJSON() {
    return this.toObject();
  }

  public toJson() {
    return this.toObject();
  }
}
