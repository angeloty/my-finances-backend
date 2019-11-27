import { Module } from '../../_core/_base/module';
import { CurrencyModel } from './models/currency.model';
import CommonController from './controllers/common.controller';
export class CommonModule extends Module {
  constructor() {
    super({
      controllers: [CommonController],
      models: [CurrencyModel]
    });
  }
}

export default CommonModule;
