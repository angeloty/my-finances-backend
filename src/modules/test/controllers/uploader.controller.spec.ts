import TestSuiteHelper from '../../../_test/helpers/test.helper';
describe('Uploader Sample Tests', () => {
  const helper = TestSuiteHelper;
  const suite = 'uploader-test';
  beforeAll(async () => {
    await helper.initSuite(suite, {
      auth: true
    });
  });

  afterAll(async () => {
    await helper.endSuite(suite);
  });

  test('Testing upload file', async () => {
    const response = await helper.request
      .post('/uploader/upload')
      .set('Content-Type', 'multipart/form-data')
      .attach('', `${__dirname}/test.files/test.png`)
      .expect(201);
    expect(response.body).not.toBeNull();
  });
});
