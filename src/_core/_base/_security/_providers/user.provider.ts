import {
  DeleteResult,
  Repository,
  Connection,
  DeepPartial,
  ObjectID
} from 'typeorm';
import { BaseUserModel } from '../../../_auth/_models/user.model';
import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';
import TokenData from '../_interfaces/tokenData.interface';
import DataStoredInToken from '../_interfaces/dataStoredInToken.interface';
import WrongCredentialsException from '../_exceptions/wrongCredentials.exception';
import UserNotFoundException from '../_exceptions/userNotFound.exception';
import InvalidUserDataException from '../_exceptions/invalidUserData.exception';
import HttpException from '../../../_exceptions/HttpException';
import { ROLE } from '../_interfaces/roles.enum';
import { QueryDeepPartialEntity } from 'typeorm/query-builder/QueryPartialEntity';

export class UserProvider {
  public static async find<U extends BaseUserModel>(
    connection: Connection,
    modelClass: new () => U,
    id: string | ObjectID | number
  ): Promise<U> {
    try {
      const repository = connection.getRepository(modelClass);
      const element: U = await repository.findOne(id);
      if (element) {
        return element;
      }
      throw new UserNotFoundException();
    } catch (e) {
      throw e;
    }
  }
  public static async create<U extends BaseUserModel>(
    connection: Connection,
    modelClass: new () => U,
    user: any
  ): Promise<U> {
    try {
      const repository: Repository<U> = connection.getRepository<U>(modelClass);
      const element: U = repository.merge(new modelClass() as U, user);
      element.password = await bcrypt.hash(user.password, 10);
      element.active = true;
      element.role = ROLE.USER;
      const saved: U = await repository.save(element as any);
      return saved;
    } catch (e) {
      if (e.code === 11000) {
        throw new InvalidUserDataException();
      }
      throw e;
    }
  }

  public static async update<U extends BaseUserModel>(
    connection: Connection,
    modelClass: new () => U,
    id: string | ObjectID | number,
    data: { [P in keyof U]: any },
    forceData: { [key: string]: any }
  ): Promise<U> {
    try {
      const repository = connection.getRepository(modelClass);
      const user: U = await UserProvider.find<U>(connection, modelClass, id);
      if (user) {
        const updated = {
          username: data.username ? data.username : user.username,
          email: data.email ? data.email : user.email
        };
        if (forceData) {
          for (const index in forceData) {
            if (forceData.hasOwnProperty(index)) {
              updated[index] = forceData[index];
            }
          }
        }
        const updateResult = await repository.update(
          user.id,
          (repository.merge(
            user,
            updated as DeepPartial<U>
          ) as unknown) as QueryDeepPartialEntity<U>
        );
        return await UserProvider.find<U>(connection, modelClass, user.id);
      }
      throw new UserNotFoundException();
    } catch (e) {
      if (e.code === 11000) {
        throw new InvalidUserDataException();
      }
      throw new InvalidUserDataException();
    }
  }

  public static async remove<U extends BaseUserModel>(
    connection: Connection,
    modelClass: new () => U,
    id: string | ObjectID | number
  ) {
    try {
      const repository = connection.getRepository(modelClass);
      const element = await UserProvider.find<U>(connection, modelClass, id);
      const deleted: DeleteResult = await repository.delete(id);
      console.log(deleted);
      if (deleted) {
        return true;
      }
      throw new HttpException(500, 'Operation Fail!!!');
    } catch (e) {
      throw e;
    }
  }

  public static async login<U extends BaseUserModel>(
    connection: Connection,
    modelClass: new () => U,
    username: string,
    password: string
  ): Promise<{ user: U; token: string; cookie: string }> {
    try {
      const repository = connection.getRepository(modelClass);
      const result: U[] = await repository.find({
        where: {
          username
        },
        select: ['password', 'username', 'id']
      });
      if (result.length) {
        const loggedIn = result[0];
        const passwordMatching = await bcrypt.compare(
          password,
          loggedIn.password
        );
        if (passwordMatching) {
          const jwToken = UserProvider.createToken<U>(loggedIn);
          const token = jwToken.token;
          const cookie = UserProvider.createCookie(jwToken);
          const user: U = await UserProvider.find(
            connection,
            modelClass,
            loggedIn.id
          );
          return { user, token, cookie };
        }
      }
      throw new WrongCredentialsException();
    } catch (e) {
      throw e;
    }
  }

  public static createToken<U extends BaseUserModel>(user: U): TokenData {
    const expiresIn = parseFloat(process.env.JWT_EXPIRES);
    const secret = process.env.JWT_SECRET;
    const dataStoredInToken: DataStoredInToken = {
      _id: user.id.toString()
    };
    return {
      expiresIn,
      token: jwt.sign(dataStoredInToken, secret, { expiresIn })
    };
  }

  public static createCookie(tokenData: TokenData): string {
    return `Authorization=${tokenData.token}; HttpOnly; Max-Age=${tokenData.expiresIn}`;
  }
}
