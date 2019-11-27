import applicationContext from '../../../_core/application.context';
import { DeepPartial, ObjectID } from 'typeorm';
import PostNotFoundException from '../../../_core/_exceptions/PostNotFoundException';
import { CurrencyModel } from '../models/currency.model';

export class CommonService {
  public findCurrency = async (id: string | number | ObjectID): Promise<CurrencyModel> => {
    try {
      const repository = applicationContext.connection.getRepository<CurrencyModel>(CurrencyModel);
      const element: CurrencyModel = await repository.findOne(id);
      if (element) {
        return element;
      }
      throw new PostNotFoundException(id);
    } catch (e) {
      throw e;
    }
  }

  public findAllCurrencies = async (): Promise<CurrencyModel[]> => {
    try {
      const repository = applicationContext.connection.getRepository<CurrencyModel>(CurrencyModel);
      return await repository.find({});
    } catch (e) {
      throw e;
    }
  }

  public createCurrency = async (earn: DeepPartial<CurrencyModel>): Promise<CurrencyModel> => {
    try {
      const repository = applicationContext.connection.getRepository<CurrencyModel>(CurrencyModel);
      return await repository.save(
        repository.merge(new CurrencyModel(), earn)
      );
    } catch (e) {
      throw e;
    }
  }

  public updateCurrency = async (
    id: string,
    test: DeepPartial<CurrencyModel>
  ): Promise<CurrencyModel> => {
    try {
      const toUpdate = await this.findCurrency(id);
      const repository = applicationContext.connection.getRepository<CurrencyModel>(CurrencyModel);
      return await repository.save(repository.merge(toUpdate, test));
    } catch (e) {
      throw e;
    }
  }

  public removeCurrency = async (id: string): Promise<boolean> => {
    try {
      const toUpdate = await this.findCurrency(id);
      const repository = applicationContext.connection.getRepository<CurrencyModel>(CurrencyModel);
      return !!(await repository.delete(id));
    } catch (e) {
      throw e;
    }
  }
}
