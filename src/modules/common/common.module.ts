import { Module } from '../../_core/_base/module';
import { CurrencyModel } from './models/currency.model';
export class CommonModule extends Module {
  constructor() {
    super({
      controllers: [],
      models: [CurrencyModel]
    });
  }
}

export default CommonModule;
