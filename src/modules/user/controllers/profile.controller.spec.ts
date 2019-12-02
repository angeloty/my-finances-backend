import profileModel from '../fixtures/profile.fixture';
import { Gender } from '../models/profile.model';
import TestSuiteHelper from '../../../_test/helpers/test.helper';

describe('Profile Tests', () => {
  const suite = 'profile-test';
  const helper = TestSuiteHelper;
  beforeAll(async () => {
    await helper.initSuite(suite, {
      auth: true
    });
    helper.setData(suite, 'profile', profileModel);
  });

  afterAll(async () => {
    await helper.endSuite(suite);
  });

  test('Create Profile', async () => {
    const response = await helper.request
      .post('/profile')
      .set('Content-Type', 'application/json')
      .set('Authorization', `Bearer ${helper.getToken(suite)}`)
      .send(profileModel)
      .expect(201);
    expect(response.body.ci).toBe(helper.getData(suite, 'profile').ci);
    expect(response.body.firstName).toBe(
      helper.getData(suite, 'profile').firstName
    );
    expect(response.body.lastName).toBe(
      helper.getData(suite, 'profile').lastName
    );
    expect(response.body.gender).toBe(
      helper.getData(suite, 'profile').gender.toString()
    );
    expect(response.body.birthday).not.toBeNull();
    expect(response.body.id).not.toBeNull();
    helper.setData(suite, 'profile', {
      ...helper.getData(suite, 'profile'),
      ...{ id: response.body.id }
    });
  });

  test('Search & Found profile', async () => {
    const response = await helper.request
      .get('/profile')
      .set('Authorization', `Bearer ${helper.getToken(suite)}`)
      .send()
      .expect(200);
    expect(response.body.id).toBe(helper.getData(suite, 'profile').id);
    expect(response.body.firstName).toBe(
      helper.getData(suite, 'profile').firstName
    );
    expect(response.body.lastName).toBe(
      helper.getData(suite, 'profile').lastName
    );
    expect(response.body.gender).toBe(
      helper.getData(suite, 'profile').gender.toString()
    );
    expect(response.body.birthday).not.toBeNull();
    expect(response.body.user).not.toBeNull();
  });

  test('Update Profile', async () => {
    const toUpdate = {
      firstName: 'Isabella',
      lastName: 'Sanchez',
      gender: Gender.FEMALE
    };
    const response = await helper.request
      .put('/profile')
      .set('Content-Type', 'application/json')
      .set('Authorization', `Bearer ${helper.getToken(suite)}`)
      .send(toUpdate)
      .expect(200);
    expect(response.body.ci).toBe(helper.getData(suite, 'profile').ci);
    expect(response.body.firstName).toBe(toUpdate.firstName);
    expect(response.body.lastName).toBe(toUpdate.lastName);
    expect(response.body.gender).toBe(toUpdate.gender.toString());
    expect(response.body.birthday).not.toBeNull();
    expect(response.body.id).not.toBeNull();
    helper.setData(suite, 'profile', {
      ...helper.getData(suite, 'profile'),
      ...{
        firstName: response.body.firstName,
        lastName: response.body.lastName,
        gender: toUpdate.gender
      }
    });
  });

  test('Update profile fail by ci duplication', async () => {
    const user = {
      id: null,
      username: 'test-2',
      email: 'test-2@email.uy',
      password: '1234567890'
    };
    const toUpdate = helper.getData(suite, 'profile');
    const singUpRes = await helper.createUser(suite, user);
    user.id = singUpRes.body.id;
    const response = await helper.loginUser(suite, user);
    await helper.request
      .put('/profile')
      .set('Content-Type', 'application/json')
      .set('Authorization', `Bearer ${response.body.token}`)
      .send(toUpdate)
      .expect(400);
    await helper.removeUser(suite, user);
  });

  test('Remove profile', async () => {
    await helper.request
      .delete('/profile')
      .set('Authorization', `Bearer ${helper.getToken(suite)}`)
      .expect(204);
  });
});
