import BaseController from '../../../_core/_base/_controller/controller';
import * as express from 'express';
import {
  Get,
  Post,
  Put,
  Delete
} from '../../../_core/_base/_controller/_decorators/route.decorator';
import { Controller } from '../../../_core/_base/_controller/_decorators/controller.decorator';
import { RequestWithUser } from '../../../_core/_base/_security/_interfaces/requestWithUser.interface';
import { UserModel } from '../../user/models/user.model';
import { CommonService } from '../services/common.service';
import { CurrencyModel } from '../models/currency.model';
import { ROLE } from '../../../_core/_base/_security/_interfaces/roles.enum';

@Controller({ path: 'common' })
export class CommonController extends BaseController {
  private service: CommonService;
  constructor() {
    super();
    this.service = new CommonService();
  }

  @Get({ path: 'currencies' })
  public async allCurrencies(
    request: RequestWithUser<UserModel>,
    response: express.Response,
    next: express.NextFunction
  ) {
    try {
      const list: CurrencyModel[] = await this.service.findAllCurrencies();
      return response.status(200).send(list);
    } catch (e) {
      return this.handleError(e, response);
    }
  }

  @Get({ path: 'currencies/:id' })
  public async getCurrency(
    request: RequestWithUser<UserModel>,
    response: express.Response,
    next: express.NextFunction
  ) {
    try {
      const element: CurrencyModel = await this.service.findCurrency(request.params.id);
      if (element) {
        return response.status(200).send(element);
      }
      return response.status(404).send();
    } catch (e) {
      return this.handleError(e, response);
    }
  }

  @Post({ path: 'currencies', secured: true, roles: [ROLE.ADMIN] })
  public async addCurrency(
    request: RequestWithUser<UserModel>,
    response: express.Response,
    next: express.NextFunction
  ) {
    try {
      const saved: CurrencyModel = await this.service.createCurrency(request.body);
      return response.status(201).send(saved);
    } catch (e) {
      return this.handleError(e, response);
    }
  }

  @Put({ path: 'currencies/:id', secured: true, roles: [ROLE.ADMIN] })
  public async updateCurrency(
    request: RequestWithUser<UserModel>,
    response: express.Response,
    next: express.NextFunction
  ) {
    try {
      const saved: CurrencyModel = await this.service.updateCurrency(
        request.params.id,
        request.body
      );
      return response.status(200).send(saved);
    } catch (e) {
      return this.handleError(e, response);
    }
  }

  @Delete({ path: 'currencies/:id', secured: true })
  public async removeCurrency(
    request: RequestWithUser<UserModel>,
    response: express.Response,
    next: express.NextFunction
  ) {
    try {
      const deleted: boolean = await this.service.removeCurrency(request.params.id);
      if (deleted) {
        return response.status(204).send();
      }
      return response.status(404).send();
    } catch (e) {
      return this.handleError(e, response);
    }
  }
}

export default CommonController;
