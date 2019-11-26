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
import { ExpensesServices } from '../services/expenses.service';
import { ExpensesModel } from '../models/expenses.model';

@Controller({ path: 'expenses' })
export class ExpensesController extends BaseController {
  private service: ExpensesServices;
  constructor() {
    super();
    this.service = new ExpensesServices();
  }

  @Get({ path: 'earns', secured: true })
  public async all(
    request: RequestWithUser<UserModel>,
    response: express.Response,
    next: express.NextFunction
  ) {
    try {
      const list: ExpensesModel[] = await this.service.findAll();
      return response.status(200).send(list);
    } catch (e) {
      return this.handleError(e, response);
    }
  }

  @Get({ path: ':id', secured: true })
  public async some(
    request: RequestWithUser<UserModel>,
    response: express.Response,
    next: express.NextFunction
  ) {
    try {
      const element: ExpensesModel = await this.service.find(request.params.id);
      if (element) {
        return response.status(200).send(element);
      }
      return response.status(404).send();
    } catch (e) {
      return this.handleError(e, response);
    }
  }

  @Post({ path: '', secured: true })
  public async add(
    request: RequestWithUser<UserModel>,
    response: express.Response,
    next: express.NextFunction
  ) {
    try {
      const saved: ExpensesModel = await this.service.create(request.body);
      return response.status(201).send(saved);
    } catch (e) {
      return this.handleError(e, response);
    }
  }

  @Put({ path: ':id', secured: true })
  public async update(
    request: RequestWithUser<UserModel>,
    response: express.Response,
    next: express.NextFunction
  ) {
    try {
      const saved: ExpensesModel = await this.service.update(
        request.params.id,
        request.body
      );
      return response.status(200).send(saved);
    } catch (e) {
      return this.handleError(e, response);
    }
  }

  @Delete({ path: ':id', secured: true })
  public async remove(
    request: RequestWithUser<UserModel>,
    response: express.Response,
    next: express.NextFunction
  ) {
    try {
      const deleted: boolean = await this.service.remove(request.params.id);
      if (deleted) {
        return response.status(204).send();
      }
      return response.status(404).send();
    } catch (e) {
      return this.handleError(e, response);
    }
  }
}

export default ExpensesController;
