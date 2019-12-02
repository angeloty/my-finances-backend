import applicationContext from '../../../_core/application.context';
import { DeepPartial, Repository, UpdateResult, ObjectID } from 'typeorm';
import PostNotFoundException from '../../../_core/_exceptions/PostNotFoundException';
import { ProfileModel } from '../models/profile.model';
import { UserModel } from '../models/user.model';
import { UserService } from './user.services';
import HttpException from '../../../_core/_exceptions/HttpException';

export class ProfileService {
  private repository: Repository<ProfileModel>;
  private userService: UserService;
  constructor() {
    this.repository = applicationContext.connection.getRepository<ProfileModel>(
      ProfileModel
    );
    this.userService = new UserService();
  }

  public find = async (
    id: string | number | ObjectID
  ): Promise<ProfileModel> => {
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

  public findByUser = async (
    id: string | number | ObjectID
  ): Promise<ProfileModel> => {
    const user: UserModel = await this.userService.findById(id);
    return user.profile;
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
    console.log(userModel);
    try {
      let profile = userModel.profile;
      if (profile) {
        return await this.update(profile.id, profileData);
      }
      profile = new ProfileModel();
      profile.user = userModel;
      if (profileData.birthday) {
        if (!(profileData.birthday instanceof Date)) {
          profileData.birthday = new Date(profileData.birthday as string);
        }
      }
      delete profileData.id;
      profile = this.repository.merge(profile, profileData);
      return await profile.save();
    } catch (e) {
      if (e.code === 9) {
        return userModel.profile;
      }
      throw new HttpException(400, e.message);
    }
  }

  public update = async (
    id: string | number | ObjectID,
    profileData: DeepPartial<ProfileModel>
  ): Promise<ProfileModel> => {
    try {
      if (profileData.birthday) {
        if (!(profileData.birthday instanceof Date)) {
          profileData.birthday = new Date(profileData.birthday as string);
        }
      }
      const updateResult: UpdateResult = await this.repository.update(
        id,
        profileData
      );
      return await this.find(id);
    } catch (e) {
      throw new HttpException(400, e.message);
    }
  }

  public removeByUserId = async (userId: string | number | ObjectID): Promise<boolean> => {
    try {
      const profile = await this.findByUser(userId);
      return !!(await this.repository.delete(profile.id));
    } catch (e) {
      throw e;
    }
  }
}
