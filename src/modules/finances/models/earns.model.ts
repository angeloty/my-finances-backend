import { Entity, Column, BaseEntity, ObjectIdColumn, ObjectID } from 'typeorm';
import { EntryModel } from './entry.model';

@Entity()
export class EarnModel extends EntryModel {

}
