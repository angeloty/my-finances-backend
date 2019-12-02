import { ObjectID } from 'bson';
import { TestHelper } from '../../../_test/helpers/test.helper';
import { UserModel } from '../../user/models/user.model';
import { userModel } from '../../../_test/helpers/fixtures/user.fixture';

const currencyModel: {
  id?: string | number | ObjectID;
  symbol: string;
  codeIso2: string;
  codeIso3: string;
  name: string;
  exchangeRateOutcome: number;
  exchangeRateIncome: number;
} = {
  name: 'Cuban Convertible Peso',
  symbol: '$',
  codeIso2: 'CU',
  codeIso3: 'CUC',
  exchangeRateOutcome: 1.0,
  exchangeRateIncome: 1.0
};

export const earnModel: {
  id?: string | number | ObjectID;
  name: string;
  note: string;
  amount: number;
  slug: string;
  currency: { [key: string]: any };
  owner: { [key: string]: any };
} = {
  name: 'Salary 11/20',
  note: '',
  amount: 2050.45,
  slug: 'salary-11-20',
  currency: null,
  owner: null
};

export const expenseModel: {
  id?: string | number | ObjectID;
  name: string;
  note: string;
  amount: number;
  slug: string;
  currency: { [key: string]: any };
  owner: { [key: string]: any };
} = {
  name: 'Rent 11/20',
  note: '',
  amount: 1200.45,
  slug: 'rent-11-20',
  currency: null,
  owner: null
};

export const initializeFixtures = async (suite: string, helper: TestHelper) => {
  if (!currencyModel.id) {
    const response = await helper.request
      .post('/common/currencies')
      .set('Content-Type', 'application/json')
      .set('Authorization', `Bearer ${helper.getToken(suite)}`)
      .send(currencyModel)
      .expect(201);
    currencyModel.id = response.body.id;
    earnModel.currency = currencyModel;
    earnModel.owner = helper.getUser(suite);
    expenseModel.currency = currencyModel;
    expenseModel.owner = helper.getUser(suite);
  }
  return currencyModel;
};

export const removeFixtures = async (suite: string, helper: TestHelper) => {
  if (currencyModel.id) {
    await helper.request
      .delete(`/common/currencies/${currencyModel.id.toString()}`)
      .set('Authorization', `Bearer ${helper.getToken(suite)}`)
      .send()
      .expect(204);
    currencyModel.id = null;
  }
};
