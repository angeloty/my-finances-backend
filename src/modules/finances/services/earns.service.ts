import applicationContext from '../../../_core/application.context';
import { DeepPartial } from 'typeorm';
import PostNotFoundException from '../../../_core/_exceptions/PostNotFoundException';
import { EarnModel } from '../models/earns.model';

export class EarnsService {
  private repository;
  constructor() {
    this.repository = applicationContext.connection.getRepository<EarnModel>(
      EarnModel
    );
  }

  public find = async (id: string): Promise<EarnModel> => {
    try {
      const element: EarnModel = await this.repository.findOne(id);
      if (element) {
        return element;
      }
      throw new PostNotFoundException(id);
    } catch (e) {
      throw e;
    }
  }

  public findAll = async (): Promise<EarnModel[]> => {
    try {
      return await this.repository.find({});
    } catch (e) {
      throw e;
    }
  }

  public create = async (test: DeepPartial<EarnModel>): Promise<EarnModel> => {
    try {
      return await this.repository.save(
        this.repository.merge(new EarnModel(), test)
      );
    } catch (e) {
      throw e;
    }
  }

  public update = async (
    id: string,
    test: DeepPartial<EarnModel>
  ): Promise<EarnModel> => {
    try {
      const toUpdate = await this.find(id);
      return await this.repository.save(this.repository.merge(toUpdate, test));
    } catch (e) {
      throw e;
    }
  }

  public remove = async (id: string): Promise<boolean> => {
    try {
      const toUpdate = await this.find(id);
      return !!(await this.repository.delete(id));
    } catch (e) {
      throw e;
    }
  }
}
