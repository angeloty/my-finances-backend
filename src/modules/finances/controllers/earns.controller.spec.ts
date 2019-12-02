import TestSuiteHelper from '../../../_test/helpers/test.helper';
import {
  initializeFixtures,
  removeFixtures,
  earnModel
} from '../tests/fixtures';

describe('Earns Tests', () => {
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

  test('Testing fail earn insert by un-authorization', async () => {
    const response = await helper.request
      .post('/earns')
      .set('Content-Type', 'application/json')
      .send(earnModel)
      .expect(401);
  });

  test('Testing insert earn', async () => {
    const response = await helper.request
      .post('/earns')
      .set('Content-Type', 'application/json')
      .set('Authorization', `Bearer ${helper.getToken(suite)}`)
      .send(earnModel)
      .expect(201);
    expect(response.body.name).toBe(earnModel.name);
    expect(response.body.note).toBe(earnModel.note);
    expect(response.body.slug).toBe(earnModel.slug);
    expect(parseFloat(response.body.amount)).toBe(
      earnModel.amount
    );
    expect(response.body.currency.id).toBe(earnModel.currency.id);
    expect(response.body.owner.id).toBe(earnModel.owner.id);
    earnModel.id = response.body.id;
  });

  test('Testing get earn', async () => {
    const response = await helper.request
      .get(`/earns/${earnModel.id.toString()}`)
      .set('Authorization', `Bearer ${helper.getToken(suite)}`)
      .send()
      .expect(200);
    expect(response.body.id).toBe(earnModel.id);
    expect(response.body.name).toBe(earnModel.name);
    expect(response.body.note).toBe(earnModel.note);
    expect(response.body.slug).toBe(earnModel.slug);
    expect(parseFloat(response.body.amount)).toBe(
      earnModel.amount
    );
    expect(response.body.currency.id).toBe(earnModel.currency.id);
    expect(response.body.owner.id).toBe(earnModel.owner.id);
  });

  test('Fail earn update by un-authorization', async () => {
    const response = await helper.request
      .put(`/earns/${earnModel.id.toString()}`)
      .set('Content-Type', 'application/json')
      .send(earnModel)
      .expect(401);
  });

  test('Testing update earn', async () => {
    earnModel.name = 'UR';
    earnModel.note = 'URY';
    earnModel.amount = 3800.4;

    const response = await helper.request
      .put(`/earns/${earnModel.id.toString()}`)
      .set('Content-Type', 'application/json')
      .set('Authorization', `Bearer ${helper.getToken(suite)}`)
      .send(earnModel)
      .expect(200);
    expect(response.body.id).toBe(earnModel.id);
    expect(response.body.name).toBe(earnModel.name);
    expect(response.body.note).toBe(earnModel.note);
    expect(response.body.slug).toBe(earnModel.slug);
    expect(parseFloat(response.body.amount)).toBe(
      earnModel.amount
    );
    expect(response.body.currency.id).toBe(earnModel.currency.id);
    expect(response.body.owner.id).toBe(earnModel.owner.id);
  });

  test('Fail earn remove by un-authorization', async () => {
    const response = await helper.request
      .delete(`/earns/${earnModel.id.toString()}`)
      .send()
      .expect(401);
  });

  test('Testing remove earn', async () => {
    const response = await helper.request
      .delete(`/earns/${earnModel.id.toString()}`)
      .set('Authorization', `Bearer ${helper.getToken(suite)}`)
      .send()
      .expect(204);
  });
});
