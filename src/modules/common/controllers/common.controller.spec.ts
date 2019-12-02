import TestSuiteHelper from '../../../_test/helpers/test.helper';
import { ObjectID } from 'typeorm';

describe('Common Module Test', () => {
  const suite = 'common-test';
  const helper = TestSuiteHelper;
  beforeAll(async () => {
    await helper.initSuite(suite, { auth: true, admin: true });
  });

  afterAll(async () => {
    await helper.endSuite(suite);
  });

  const currencyModel: {
    id?: string | number | ObjectID;
    symbol: string;
    codeIso2: string;
    codeIso3: string;
    name: string;
    exchangeRateOutcome: number;
    exchangeRateIncome: number;
  } = {
    name: 'Dollars',
    symbol: '$',
    codeIso2: 'US',
    codeIso3: 'USD',
    exchangeRateOutcome: 1.0,
    exchangeRateIncome: 1.0
  };

  test('Testing fail insert by unauthorization', async () => {
    const response = await helper.request
      .post('/common/currencies')
      .set('Content-Type', 'application/json')
      .send(currencyModel)
      .expect(401);
  });

  test('Testing insert currency', async () => {
    const response = await helper.request
      .post('/common/currencies')
      .set('Content-Type', 'application/json')
      .set('Authorization', `Bearer ${helper.getToken(suite)}`)
      .send(currencyModel)
      .expect(201);
    expect(response.body.name).toBe(currencyModel.name);
    expect(response.body.symbol).toBe(currencyModel.symbol);
    expect(response.body.codeIso2).toBe(currencyModel.codeIso2);
    expect(response.body.codeIso3).toBe(currencyModel.codeIso3);
    expect(parseFloat(response.body.exchangeRateOutcome)).toBe(
      parseFloat(currencyModel.exchangeRateOutcome.toString())
    );
    expect(parseFloat(response.body.exchangeRateIncome)).toBe(
      parseFloat(currencyModel.exchangeRateIncome.toString())
    );
    currencyModel.id = response.body.id;
  });

  test('Testing get currency', async () => {
    const response = await helper.request
      .get(`/common/currencies/${currencyModel.id.toString()}`)
      .set('Authorization', `Bearer ${helper.getToken(suite)}`)
      .send()
      .expect(200);
    expect(response.body.id).toBe(currencyModel.id);
    expect(response.body.name).toBe(currencyModel.name);
    expect(response.body.symbol).toBe(currencyModel.symbol);
    expect(response.body.codeIso2).toBe(currencyModel.codeIso2);
    expect(response.body.codeIso3).toBe(currencyModel.codeIso3);
    expect(parseFloat(response.body.exchangeRateOutcome)).toBe(
      parseFloat(currencyModel.exchangeRateOutcome.toString())
    );
    expect(parseFloat(response.body.exchangeRateIncome)).toBe(
      parseFloat(currencyModel.exchangeRateIncome.toString())
    );
  });

  test('Fail update by unauthorization', async () => {
    const response = await helper.request
      .put(`/common/currencies/${currencyModel.id.toString()}`)
      .set('Content-Type', 'application/json')
      .send(currencyModel)
      .expect(401);
  });

  test('Testing update currency', async () => {
    currencyModel.codeIso2 = 'UR';
    currencyModel.codeIso3 = 'URY';
    currencyModel.symbol = '$';
    currencyModel.name = 'Pesos Uruguayos';
    currencyModel.exchangeRateIncome = 36.8;
    currencyModel.exchangeRateOutcome = 38.4;

    const response = await helper.request
      .put(`/common/currencies/${currencyModel.id.toString()}`)
      .set('Content-Type', 'application/json')
      .set('Authorization', `Bearer ${helper.getToken(suite)}`)
      .send(currencyModel)
      .expect(200);
    expect(response.body.id).toBe(currencyModel.id);
    expect(response.body.name).toBe(currencyModel.name);
    expect(response.body.symbol).toBe(currencyModel.symbol);
    expect(response.body.codeIso2).toBe(currencyModel.codeIso2);
    expect(response.body.codeIso3).toBe(currencyModel.codeIso3);
    expect(parseFloat(response.body.exchangeRateOutcome)).toBe(
      parseFloat(currencyModel.exchangeRateOutcome.toString())
    );
    expect(parseFloat(response.body.exchangeRateIncome)).toBe(
      parseFloat(currencyModel.exchangeRateIncome.toString())
    );
  });

  test('Fail remove by unauthorization', async () => {
    const response = await helper.request
      .delete(`/common/currencies/${currencyModel.id.toString()}`)
      .send()
      .expect(401);
  });

  test('Testing remove currency', async () => {
    const response = await helper.request
      .delete(`/common/currencies/${currencyModel.id.toString()}`)
      .set('Authorization', `Bearer ${helper.getToken(suite)}`)
      .send()
      .expect(204);
  });
});
