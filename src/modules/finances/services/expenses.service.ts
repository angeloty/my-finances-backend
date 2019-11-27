import applicationContext from '../../../_core/application.context';
import { ExpensesModel } from '../models/expenses.model';
import { EntryService } from './entry.services';

export class ExpensesServices extends EntryService<ExpensesModel> {
  public getRepository() {
    return applicationContext.connection.getRepository<ExpensesModel>(
      ExpensesModel
    );
  }
}
