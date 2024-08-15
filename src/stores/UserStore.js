import { makeAutoObservable } from 'mobx';
import defaultProfileImage from '../assets/images/default-profile.png';

class UserStore {
  jwtToken = null;
  user = null;

  constructor() {
    makeAutoObservable(this);
  }

  setJwtToken(token) {
    this.jwtToken = token;
  }

  setUserData({ email, profileImage, players }) {
    this.user = {
      email,
      profileImage: defaultProfileImage,
      players
    };
  }

  clearUserData() {
    this.jwtToken = null;
    this.user = null;
  }
}

export const userStore = new UserStore();
