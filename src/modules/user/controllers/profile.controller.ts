import * as express from 'express';
import Controller from '../../../_core/_base/_controller/_decorators/controller.decorator';
import BaseController from '../../../_core/_base/_controller/controller';
import { ProfileService } from '../services/profile.service';
import {
  Get,
  Post,
  Put,
  Delete
} from '../../../_core/_base/_controller/_decorators/route.decorator';
import { ProfileModel } from '../models/profile.model';
import { RequestWithUser } from '../../../_core/_base/_security/_interfaces/requestWithUser.interface';
import { UserModel } from '../models/user.model';

@Controller({ path: 'profile' })
export class ProfileController extends BaseController {
  private service: ProfileService;
  constructor() {
    super();
    this.service = new ProfileService();
  }

  @Get({ path: '', secured: true })
  public async some(
    request: RequestWithUser<UserModel>,
    response: express.Response,
    next: express.NextFunction
  ) {
    try {
      const element: ProfileModel = await this.service.find(
        request.user.id.toString()
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
  public async create(
    request: RequestWithUser<UserModel>,
    response: express.Response,
    next: express.NextFunction
  ) {
    try {
      const saved: ProfileModel = await this.service.save(
        request.body,
        request.user
      );
      const profile = await this.service.find(saved.id);
      return response.status(200).send(saved);
    } catch (e) {
      return this.handleError(e, response);
    }
  }

  @Put({ path: '', secured: true })
  public async update(
    request: RequestWithUser<UserModel>,
    response: express.Response,
    next: express.NextFunction
  ) {
    try {
      const saved: ProfileModel = await this.service.save(
        request.body,
        request.user
      );
      return response.status(200).send(saved);
    } catch (e) {
      return this.handleError(e, response);
    }
  }

  @Delete({ path: '', secured: true })
  public async remove(
    request: RequestWithUser<UserModel>,
    response: express.Response,
    next: express.NextFunction
  ) {
    try {
      const deleted: boolean = await this.service.remove(
        request.user.id.toString()
      );
      if (deleted) {
        return response.status(204).send();
      }
      return response.status(404).send();
    } catch (e) {
      return this.handleError(e, response);
    }
  }
}

export default ProfileController;
