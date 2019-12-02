import { Gender } from '../models/profile.model';

export const profileModel = {
  id: null,
  ci: `6.419.206-5${Math.random().toString(36).substring(7)}`,
  firstName: 'Angel Rafael',
  lastName: 'Sanchez Napoles',
  gender: Gender.MALE,
  birthday: '07/13/1985'
};

export default profileModel;
