import { UserModel } from './modules/user/models/user.model';
import { UserModule } from './modules/user/user.module';
import 'reflect-metadata';
import * as express from 'express';
import * as cookieParser from 'cookie-parser';
import { TestModule } from './modules/test/test.module';
import { Environment } from './_core/_base/environment';
import { FinancesModule } from './modules/finances/finances.module';
import CommonModule from './modules/common/common.module';
const appEnvironment = new Environment({
  modules: [CommonModule, FinancesModule, UserModule, TestModule],
  environment: process.env.NODE_ENV,
  middleware: [
    express.urlencoded.bind(express, { extended: false }),
    express.json,
    express.text,
    cookieParser
  ],
  security: {
    userModel: UserModel as any
  }
});

export default appEnvironment;
