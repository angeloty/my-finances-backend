import { UserModel } from './models/user.model';
import { UserController } from './controllers/user.controller';
import { Module } from '../../_core/_base/module';
import { ProfileModel } from './models/profile.model';
import ProfileController from './controllers/profile.controller';
export class UserModule extends Module {
  constructor() {
    super({
      controllers: [UserController, ProfileController],
      models: [UserModel, ProfileModel]
    });
  }
}
