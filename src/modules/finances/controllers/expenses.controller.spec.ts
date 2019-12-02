import TestSuiteHelper from '../../../_test/helpers/test.helper';
import {
  initializeFixtures,
  removeFixtures,
  expenseModel
} from '../tests/fixtures';

describe('Expenses Tests', () => {
  const helper = TestSuiteHelper;
  const suite = 'earns-test';
  beforeAll(async () => {
    await helper.initSuite(suite, {
      auth: true,
      admin: true
    });
    await initializeFixtures(suite, helper);
  });

  afterAll(async () => {
    await removeFixtures(suite, helper);
    await helper.endSuite(suite);
  });

  test('Testing fail expense insert by un-authorization', async () => {
    const response = await helper.request
      .post('/expenses')
      .set('Content-Type', 'application/json')
      .send(expenseModel)
      .expect(401);
  });

  test('Testing insert expenses', async () => {
    const response = await helper.request
      .post('/expenses')
      .set('Content-Type', 'application/json')
      .set('Authorization', `Bearer ${helper.getToken(suite)}`)
      .send(expenseModel)
      .expect(201);
    expect(response.body.name).toBe(expenseModel.name);
    expect(response.body.note).toBe(expenseModel.note);
    expect(response.body.slug).toBe(expenseModel.slug);
    expect(parseFloat(response.body.amount)).toBe(
      expenseModel.amount
    );
    expect(response.body.currency.id).toBe(expenseModel.currency.id);
    expect(response.body.owner.id).toBe(expenseModel.owner.id);
    expenseModel.id = response.body.id;
  });

  test('Testing get expense', async () => {
    const response = await helper.request
      .get(`/expenses/${expenseModel.id.toString()}`)
      .set('Authorization', `Bearer ${helper.getToken(suite)}`)
      .send()
      .expect(200);
    expect(response.body.id).toBe(expenseModel.id);
    expect(response.body.name).toBe(expenseModel.name);
    expect(response.body.note).toBe(expenseModel.note);
    expect(response.body.slug).toBe(expenseModel.slug);
    expect(parseFloat(response.body.amount)).toBe(
      expenseModel.amount
    );
    expect(response.body.currency.id).toBe(expenseModel.currency.id);
    expect(response.body.owner.id).toBe(expenseModel.owner.id);
  });

  test('Fail expense update by un-authorization', async () => {
    const response = await helper.request
      .put(`/expenses/${expenseModel.id.toString()}`)
      .set('Content-Type', 'application/json')
      .send(expenseModel)
      .expect(401);
  });

  test('Testing update expense', async () => {
    expenseModel.name = 'UR';
    expenseModel.note = 'URY';
    expenseModel.amount = 3800.4;

    const response = await helper.request
      .put(`/expenses/${expenseModel.id.toString()}`)
      .set('Content-Type', 'application/json')
      .set('Authorization', `Bearer ${helper.getToken(suite)}`)
      .send(expenseModel)
      .expect(200);
    expect(response.body.id).toBe(expenseModel.id);
    expect(response.body.name).toBe(expenseModel.name);
    expect(response.body.note).toBe(expenseModel.note);
    expect(response.body.slug).toBe(expenseModel.slug);
    expect(parseFloat(response.body.amount)).toBe(
      expenseModel.amount
    );
    expect(response.body.currency.id).toBe(expenseModel.currency.id);
    expect(response.body.owner.id).toBe(expenseModel.owner.id);
  });

  test('Fail expense remove by un-authorization', async () => {
    const response = await helper.request
      .delete(`/expenses/${expenseModel.id.toString()}`)
      .send()
      .expect(401);
  });

  test('Testing remove expense', async () => {
    const response = await helper.request
      .delete(`/expenses/${expenseModel.id.toString()}`)
      .set('Authorization', `Bearer ${helper.getToken(suite)}`)
      .send()
      .expect(204);
  });
});
