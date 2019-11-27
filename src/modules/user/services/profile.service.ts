import applicationContext from '../../../_core/application.context';
import { DeepPartial, Repository, UpdateResult, ObjectID } from 'typeorm';
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

  public find = async (id: string | number | ObjectID): Promise<ProfileModel> => {
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

  public save = async (
    profileData: DeepPartial<ProfileModel>,
    user: UserModel
  ): Promise<ProfileModel> => {
    const userModel: UserModel = await this.userService.findById(user.id);
    try {
      let profile = userModel.profile;
      if (!profile) {
        profile = new ProfileModel();
        profile.user = userModel;
      }
      if (profileData.birthday) {
        if (!(profile.birthday instanceof Date)) {
          profileData.birthday = new Date(profileData.birthday as Date);
        }
      }
      profile = this.repository.merge(profile, profileData);
      return await profile.save();
    } catch (e) {
      if (e.code === 9) {
        return userModel.profile;
      }
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
