import { Column, BaseEntity, Index, PrimaryGeneratedColumn } from 'typeorm';
import { ROLE } from '../../_base/_security/_interfaces/roles.enum';

export class BaseUserModel extends BaseEntity {
  @PrimaryGeneratedColumn()
  public id: number;

  @Column()
  @Index({ unique: true, expireAfterSeconds: 3600 })
  public username: string;

  @Column()
  @Index({ unique: true, expireAfterSeconds: 3600 })
  public email: string;

  @Column({ select: false })
  public password: string;

  @Column()
  public active: boolean;

  @Column({
    type: 'enum',
    enum: ROLE,
    default: ROLE.USER
  })
  public role: ROLE;
}
