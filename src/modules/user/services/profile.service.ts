import applicationContext from '../../../_core/application.context';
import { DeepPartial, Repository } from 'typeorm';
import PostNotFoundException from '../../../_core/_exceptions/PostNotFoundException';
import { ProfileModel } from '../models/profile.model';
import { UserModel } from '../models/user.model';
import { UserService } from './user.services';

export class ProfileService {
  private repository: Repository<ProfileModel>;
  private userService: UserService;
  constructor() {
    this.repository = applicationContext.connection.getRepository<ProfileModel>(
      ProfileModel
    );
    this.userService = new UserService();
  }

  public find = async (id: string): Promise<ProfileModel> => {
    try {
      const element: ProfileModel = await this.repository.findOne(id);
      if (element) {
        return element;
      }
      throw new PostNotFoundException(id);
    } catch (e) {
      throw e;
    }
  }

  public findAll = async (): Promise<ProfileModel[]> => {
    try {
      return await this.repository.find({});
    } catch (e) {
      throw e;
    }
  }

  public create = async (
    test: DeepPartial<ProfileModel>,
    user: UserModel
  ): Promise<ProfileModel> => {
    try {
      const userModel: UserModel = await this.userService.findById(user.id.toString());
      const currentProfile = await userModel.profile;
      const profile: ProfileModel = await this.repository.save(
        this.repository.merge((currentProfile || new ProfileModel()), test)
      );
      user.profile = profile;
      await this.userService.update(user.id, user);
      return profile;
    } catch (e) {
      throw e;
    }
  }

  public update = async (
    id: string,
    test: DeepPartial<ProfileModel>,
    user: UserModel
  ): Promise<ProfileModel> => {
    try {
      const toUpdate = await this.find(id);
      const profile: ProfileModel = await this.repository.save(
        this.repository.merge(toUpdate, test)
      );
      user.profile = profile;
      profile.user = await this.userService.update(user.id, user);
      return profile;
    } catch (e) {
      throw e;
    }
  }

  public remove = async (id: string): Promise<boolean> => {
    try {
      const toUpdate = await this.find(id);
      return !!(await this.repository.delete(id));
    } catch (e) {
      throw e;
    }
  }
}
