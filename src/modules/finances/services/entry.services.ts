import { DeepPartial, Repository, SelectQueryBuilder, ObjectID } from 'typeorm';
import PostNotFoundException from '../../../_core/_exceptions/PostNotFoundException';
import { CommonService } from '../../common/services/common.service';
import { EntryModel } from '../models/entry.model';
import { CurrencyModel } from '../../common/models/currency.model';
import { UserModel } from '../../user/models/user.model';
import { UserService } from '../../user/services/user.services';

export abstract class EntryService<T extends EntryModel> {
  protected repository: Repository<T>;
  protected commonService: CommonService;
  protected userService: UserService;
  constructor() {
    this.repository = this.getRepository();
    this.commonService = new CommonService();
    this.userService = new UserService();
  }

  public abstract getRepository(): Repository<T>;

  public find = async (id: string): Promise<T> => {
    try {
      const element: T = await this.repository.findOne(id);
      if (element) {
        return element;
      }
      throw new PostNotFoundException(id);
    } catch (e) {
      throw e;
    }
  }

  public findByUser = async (entryId: number|string|ObjectID, user: UserModel): Promise<T> => {
    try {
      const id = user.id;
      return await this.repository
        .createQueryBuilder('entry')
        .innerJoinAndSelect('entry.currency', 'currency')
        .innerJoinAndSelect('entry.owner', 'owner', 'owner.id = :id', { id })
        .where('entry.id = :entryId', { entryId })
        .getOne();
    } catch (e) {
      throw e;
    }
  }

  public findAll = async (): Promise<T[]> => {
    try {
      return await this.repository.find({});
    } catch (e) {
      throw e;
    }
  }

  public findAllByUser = async (user: UserModel): Promise<T[]> => {
    try {
      const id = user.id;
      return await this.repository
        .createQueryBuilder('entry')
        .innerJoinAndSelect('entry.currency', 'currency')
        .innerJoinAndSelect('entry.owner', 'owner', 'owner.id = :id', { id })
        .getMany();
    } catch (e) {
      throw e;
    }
  }

  public create = async (
    earn: DeepPartial<T>,
    owner: UserModel
  ): Promise<T> => {
    try {
      const toSave = this.repository.merge({} as T, earn);
      if (earn.currency && ((earn.currency as unknown) as CurrencyModel).id) {
        const currency = await this.commonService.findCurrency(
          ((earn.currency as unknown) as CurrencyModel).id
        );
        toSave.currency = currency;
      }
      toSave.owner = owner;
      return await this.repository.save((toSave as unknown) as DeepPartial<T>);
    } catch (e) {
      throw e;
    }
  }

  public update = async (
    id: string,
    earn: DeepPartial<T>,
    owner: UserModel
  ): Promise<T> => {
    try {
      let toUpdate = await this.find(id);
      toUpdate = this.repository.merge(toUpdate, earn);
      if (earn.currency && ((earn.currency as unknown) as CurrencyModel).id) {
        const currency = await this.commonService.findCurrency(
          ((earn.currency as unknown) as CurrencyModel).id
        );
        toUpdate.currency = currency;
      }
      toUpdate.owner = owner;
      return await this.repository.save(
        (toUpdate as unknown) as DeepPartial<T>
      );
    } catch (e) {
      throw e;
    }
  }

  public remove = async (id: string): Promise<boolean> => {
    try {
      return !!(await this.repository.delete(id));
    } catch (e) {
      throw e;
    }
  }
}
