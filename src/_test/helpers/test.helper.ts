import supertest = require('supertest');
import App from '../../_core/_base/app';
import { userModel, authParams } from './fixtures/user.fixture';
import appEnvironment from '../../app';
import { Environment } from '../../_core/_base/environment';
import { ObjectID } from 'typeorm';
import { ROLE } from '../../_core/_base/_security/_interfaces/roles.enum';

export class TestHelper {
  public environment: Environment<any>;
  public request: supertest.SuperTest<supertest.Test>;
  public app: App;
  public suite: {
    [key: string]: {
      options?: {
        [k: string]: any;
      };
      user: {
        id?: string | number | ObjectID;
        username: string;
        email?: string;
        password: string;
        role: ROLE;
      };
      authParam: { token: string };
      data: { [index: string]: any };
    };
  } = {};

  public initSuite = async (
    suite: string,
    options: { auth: boolean, admin?: boolean } = { auth: false, admin: false }
  ) => {
    if (!this.suite[suite]) {
      this.suite[suite] = {
        options,
        user: {
          username: `suite-${suite}-username${Math.random()
            .toString(36)
            .substring(7)}`,
          email: `email${Math.random()
            .toString(36)
            .substring(7)}@${suite}.com`,
          role: options.admin ? ROLE.ADMIN : ROLE.USER,
          password: `pass-${suite}`
        },
        authParam: {
          token: ''
        },
        data: {}
      };
    }
    if (options) {
      if (options.auth) {
        await this.initForAuthTest(suite);
        await this.loginUser(suite);
        return;
      }
    }
    await this.init(suite);
    return;
  }

  public endSuite = async (suite: string) => {
    if (this.suite[suite]) {
      if (this.suite[suite].options.auth) {
        await this.removeUser(suite);
        return;
      }
    }
    return Promise.resolve();
  }

  public createUser = async (suite: string, u?: any) => {
    if (!this.request) {
      await this.init(suite);
    }
    const user = u || this.getUser(suite) || userModel;
    const signUpResponse = await this.request
      .post('/users/signup')
      .set('Content-Type', 'application/json')
      .send(user);
    user.id = signUpResponse.body.id;
    if (!u) {
      this.suite[suite].user = user;
    } else {
      u.id = user.id;
    }
    return signUpResponse;
  }

  public loginUser = async (suite: string, u?: any) => {
    if (!this.request) {
      await this.init(suite);
    }
    const loginResponse = await this.request
      .post('/users/signin')
      .set('Content-Type', 'application/json')
      .send(u || this.getUser(suite))
      .expect(200);
    if (!u) {
      this.suite[suite].authParam.token = loginResponse.body.token;
    }
    return loginResponse;
  }

  public removeUser = async (suite: string, user?: any) => {
    if (!this.request) {
      await this.init(suite);
    }
    console.log(user);
    await this.request
      .delete(
        '/users/' +
          (user ? user.id.toString() : this.getUser(suite).id.toString())
      )
      .set('Authorization', 'Bearer ' + this.getToken(suite))
      .send()
      .expect(204);
    return;
  }

  public getUser = (suite: string) => {
    return this.suite[suite] && this.suite[suite].user
      ? this.suite[suite].user
      : userModel;
  }

  public setUser = (suite: string, user: any) => {
    this.suite[suite].user = { ...this.suite[suite].user, ...user };
  }

  public getToken = (suite: string) => {
    return this.suite[suite] && this.suite[suite].authParam
      ? this.suite[suite].authParam.token
      : authParams.token;
  }

  public setToken = (suite: string, token: string) => {
    this.suite[suite].authParam.token = token;
  }

  public setData(suite: string, index: string, value: any) {
    if (this.suite[suite]) {
      this.initSuite(suite);
    }
    this.suite[suite].data[index] = value;
  }

  public getData(suite: string, index: string) {
    return this.suite[suite] ? this.suite[suite].data[index] : null;
  }

  private init = async (suite: string) => {
    try {
      process.env.NODE_ENV = 'test';
      if (!this.environment) {
        this.environment = appEnvironment;
      }
      if (!this.app) {
        this.app = await this.environment.init();
        if (!this.request) {
          this.request = supertest(this.app.app);
        }
        return;
      }
      return Promise.resolve();
    } catch (e) {
      console.log(e);
      Promise.reject(e);
    }
  }

  private initForAuthTest = async (suite: string) => {
    if (!this.request) {
      await this.init(suite);
    }
    await this.createUser(suite);
    return;
  }
}

const TestSuiteHelper = new TestHelper();

export default TestSuiteHelper;
