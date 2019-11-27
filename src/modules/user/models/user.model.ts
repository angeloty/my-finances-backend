import {
  Entity,
  Column,
  BaseEntity,
  ObjectIdColumn,
  ObjectID,
  OneToOne,
  JoinColumn,
  JoinTable
} from 'typeorm';
import { BaseUserModel } from '../../../_core/_auth/_models/user.model';
import { ProfileModel } from './profile.model';

@Entity()
export class UserModel extends BaseUserModel {
  @OneToOne(type => ProfileModel, profile => profile.user, {
    eager: true
  })
  public profile: ProfileModel;
}
