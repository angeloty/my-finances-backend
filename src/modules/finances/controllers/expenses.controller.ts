import { Controller } from '../../../_core/_base/_controller/_decorators/controller.decorator';
import EntryController from './entry.controller';
import { ExpensesModel } from '../models/expenses.model';
import { ExpensesServices } from '../services/expenses.service';

@Controller({ path: 'expenses' })
export class ExpensesController extends EntryController<ExpensesModel, ExpensesServices> {
  protected getService(): ExpensesServices {
    return new ExpensesServices();
  }
}

export default ExpensesController;
