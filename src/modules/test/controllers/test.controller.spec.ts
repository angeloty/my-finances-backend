import TestSuiteHelper from '../../../_test/helpers/test.helper';
import { ObjectID } from 'typeorm';

describe('Sample tests', () => {
  const helper = TestSuiteHelper;
  const suite = 'sample-test';
  beforeAll(async () => {
    await helper.initSuite(suite, {
      auth: true
    });
  });

  afterAll(async () => {
    await helper.endSuite(suite);
  });

  const testModel: { id?: string | number | ObjectID; name: string; description: string } = {
    name: 'Testing',
    description: 'Test description'
  };

  test('Testing insert test', async () => {
    const response = await helper.request
      .post('/test/test')
      .set('Content-Type', 'application/json')
      .send(testModel)
      .expect(201);
    expect(response.body.name).toBe(testModel.name);
    expect(response.body.description).toBe(testModel.description);
    testModel.id = response.body.id;
  });

  test('Testing get test', async () => {
    const response = await helper.request
      .get(`/test/test/${testModel.id.toString()}`)
      .send()
      .expect(200);
    expect(response.body.name).toBe(testModel.name);
    expect(response.body.description).toBe(testModel.description);
  });

  test('Testing update test', async () => {
    const newModel = testModel;
    newModel.name = 'Test Updated';
    newModel.description = 'Test description updated';
    const response = await helper.request
      .put(`/test/test/${testModel.id.toString()}`)
      .send(newModel)
      .expect(200);
    expect(response.body.name).toBe(newModel.name);
    expect(response.body.description).toBe(newModel.description);
  });

  test('Testing get all tests', async () => {
    const response = await helper.request
      .get('/test/test')
      .send()
      .expect(200);
  });

  test('Testing delete test', async () => {
    await helper.request
      .delete(`/test/test/${testModel.id.toString()}`)
      .send()
      .expect(204);
    await helper.request
      .put(`/test/test/${testModel.id.toString()}`)
      .send()
      .expect(404);
  });
});
