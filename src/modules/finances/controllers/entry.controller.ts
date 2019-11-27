import * as express from 'express';
import BaseController from '../../../_core/_base/_controller/controller';
import { EntryModel } from '../models/entry.model';
import { EntryService } from '../services/entry.services';
import { Get, Delete, Put, Post } from '../../../_core/_base/_controller/_decorators/route.decorator';
import { RequestWithUser } from '../../../_core/_base/_security/_interfaces/requestWithUser.interface';
import { UserModel } from '../../user/models/user.model';

export abstract class EntryController<T extends EntryModel, S extends EntryService<T>> extends BaseController {
  private service: S;
  constructor() {
    super();
    this.service = this.getService();
  }

  @Get({ path: '', secured: true })
  public async all(
    request: RequestWithUser<UserModel>,
    response: express.Response,
    next: express.NextFunction
  ) {
    try {
      const list: T[] = await this.service.findAllByUser(request.user);
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
      const element: T = await this.service.findByUser(
        request.params.id,
        request.user
      );
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
      const saved: T = await this.service.create(
        request.body,
        request.user
      );
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
      const saved: T = await this.service.update(
        request.params.id,
        request.body,
        request.user
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
      const toRemove = await this.service.findByUser(
        request.params.id,
        request.user
      );
      if (toRemove && toRemove.owner.id === request.user.id) {
        const deleted: boolean = await this.service.remove(request.params.id);
        if (deleted) {
          return response.status(204).send();
        }
      } else {
        return response.status(403).send();
      }
      return response.status(404).send();
    } catch (e) {
      return this.handleError(e, response);
    }
  }

  protected abstract getService(): S;
}

export default EntryController;
