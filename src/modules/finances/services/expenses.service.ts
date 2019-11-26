import applicationContext from '../../../_core/application.context';
import { DeepPartial } from 'typeorm';
import PostNotFoundException from '../../../_core/_exceptions/PostNotFoundException';
import { ExpensesModel } from '../models/expenses.model';

export class ExpensesServices {
  private repository;
  constructor() {
    this.repository = applicationContext.connection.getRepository<ExpensesModel>(ExpensesModel);
  }

  public find = async (id: string): Promise<ExpensesModel> => {
    try {
      const element: ExpensesModel = await this.repository.findOne(id);
      if (element) {
        return element;
      }
      throw new PostNotFoundException(id);
    } catch (e) {
      throw e;
    }
  }

  public findAll = async (): Promise<ExpensesModel[]> => {
    try {
      return await this.repository.find({});
    } catch (e) {
      throw e;
    }
  }

  public create = async (
    test: DeepPartial<ExpensesModel>
  ): Promise<ExpensesModel> => {
    try {
      return await this.repository.save(
        this.repository.merge(new ExpensesModel(), test)
      );
    } catch (e) {
      throw e;
    }
  }

  public update = async (
    id: string,
    test: DeepPartial<ExpensesModel>
  ): Promise<ExpensesModel> => {
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
