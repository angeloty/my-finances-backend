import { Controller } from '../../../_core/_base/_controller/_decorators/controller.decorator';
import { EarnsService } from '../services/earns.service';
import { EarnModel } from '../models/earns.model';
import EntryController from './entry.controller';

@Controller({ path: 'earns' })
export class EarnsController extends EntryController<EarnModel, EarnsService> {
  protected getService(): EarnsService {
    return new EarnsService();
  }
}

export default EarnsController;
