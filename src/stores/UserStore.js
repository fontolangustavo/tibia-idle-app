import { makeAutoObservable } from 'mobx';
import defaultProfileImage from '../assets/images/default-profile.png';

class UserStore {
  token = null;
  user = null;
  selectedPlayer = null;

  constructor() {
    makeAutoObservable(this);
  }

  setToken(token) {
    this.token = token;
  }

  setUserData({ email, players }) {
    this.user = {
      email,
      profileImage: defaultProfileImage,
      players
    };
  }

  setSelectedPlayer(playerId) {
    this.selectedPlayer = playerId;
  }

  setPlayers(players) {
    this.user = {
      ...this.user,
      players
    }
  }

  clearUserData() {
    this.token = null;
    this.user = null;
  }
}

export const userStore = new UserStore();
