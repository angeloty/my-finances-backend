import applicationContext from '../../../_core/application.context';
import { EarnModel } from '../models/earns.model';
import { EntryService } from './entry.services';

export class EarnsService extends EntryService<EarnModel> {
  public getRepository() {
    return applicationContext.connection.getRepository<EarnModel>(EarnModel);
  }

}
