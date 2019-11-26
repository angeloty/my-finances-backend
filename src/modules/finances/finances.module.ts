import { Module } from '../../_core/_base/module';
import EarnsController from './controllers/earns.controller';
import ExpensesController from './controllers/expenses.controller';
import { EarnModel } from './models/earns.model';
import { ExpensesModel } from './models/expenses.model';
export class FinancesModule extends Module {
  constructor() {
    super({
      controllers: [EarnsController, ExpensesController],
      models: [EarnModel, ExpensesModel]
    });
  }
}

export default FinancesModule;
