import TestSuiteHelper from '../../../_test/helpers/test.helper';

describe('User Tests', () => {
  const suite = 'user-test';
  const helper = TestSuiteHelper;
  beforeAll(async () => {
    await helper.initSuite(suite);
  });

  afterAll(async () => {
    await helper.endSuite(suite);
  });

  test('Testing insert user', async () => {
    const response = await helper.request
      .post('/users/signup')
      .set('Content-Type', 'application/json')
      .send(helper.getUser(suite))
      .expect(201);
    expect(response.body.username).toBe(helper.getUser(suite).username);
    expect(response.body.email).toBe(helper.getUser(suite).email);
    expect(response.body.active).toBeTruthy();
    expect(response.body.id).not.toBeNull();
    helper.setUser(suite, { id: response.body.id });
  });

  test('Testing user login', async () => {
    const response = await helper.request
      .post('/users/signin')
      .set('Content-Type', 'application/json')
      .send(helper.getUser(suite))
      .expect(200);
    expect(response.body.user).not.toBeNull();
    expect(response.body.token).not.toBeNull();
    expect(response.body.user.username).toBe(helper.getUser(suite).username);
    expect(response.body.user.email).toBe(helper.getUser(suite).email);
    expect(response.body.user.id).toBe(helper.getUser(suite).id);
    helper.setToken(suite, response.body.token);
  });

  test('Testing get user', async () => {
    const response = await helper.request
      .get(`/users/${helper.getUser(suite).id}`)
      .set('Authorization', `Bearer ${helper.getToken(suite)}`)
      .send()
      .expect(200);
    expect(response.body.username).toBe(helper.getUser(suite).username);
    expect(response.body.email).toBe(helper.getUser(suite).email);
    expect(response.body.id).toBe(helper.getUser(suite).id);
    expect(response.body.active).toBeTruthy();
  });

  test('Testing update user', async () => {
    const user = {
      username: 'new-test',
      email: 'new-test@email'
    };
    const response = await helper.request
      .put(`/users/${helper.getUser(suite).id}`)
      .set('Content-Type', 'application/json')
      .set('Authorization', `Bearer ${helper.getToken(suite)}`)
      .send(user)
      .expect(200);
    helper.setUser(suite, user);
    expect(response.body.username).toBe(helper.getUser(suite).username);
    expect(response.body.email).toBe(helper.getUser(suite).email);
    expect(response.body.id).toBe(helper.getUser(suite).id);
    expect(response.body.active).toBeTruthy();
  });

  test('Testing block username duplicated', async () => {
    await helper.request
      .post('/users/signup')
      .set('Content-Type', 'application/json')
      .send({
        username: helper.getUser(suite).username,
        email: 'other@email',
        password: '1234567'
      })
      .expect(400);
  });

  test('Testing block email duplicated', async () => {
    await helper.request
      .post('/users/signup')
      .set('Content-Type', 'application/json')
      .send({
        username: 'other-new-test',
        email: helper.getUser(suite).email,
        password: '1234567'
      })
      .expect(400);
  });

  test('Testing get all users', async () => {
    await helper.request
      .get('/users')
      .send()
      .expect(200);
  });

  test('Testing delete user', async () => {
    await helper.request
      .delete(`/users/${helper.getUser(suite).id}`)
      .set('Authorization', `Bearer ${helper.getToken(suite)}`)
      .send()
      .expect(204);
    await helper.request
      .get(`/users/${helper.getUser(suite).id}`)
      .set('Authorization', `Bearer ${helper.getToken(suite)}`)
      .send()
      .expect(404);
  });
});
