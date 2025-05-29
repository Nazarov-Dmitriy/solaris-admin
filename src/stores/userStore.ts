import { defineStore } from 'pinia';
import { User, ErrorType, State } from '../interfaces/user/userInterfaces';
import {
  autoLoginService,
  fetchUserService,
  loginService,
} from '../services/auth';
import { handleError } from '../utils/errorUtil';
import { AuthorisedUser } from '../interfaces/user/userInterfaces';

export const useUserStore = defineStore('userStore', {
  state: () => ({ user: {} as AuthorisedUser, token: '' }),

  getters: {
    user: (state) => {
      state.user, state.token;
    },
    admin: (state) => state.user.is_admin,
  },

  actions: {
    setUser(user: JSON) {
      return localStorage.setItem('user', JSON.stringify(user));
    },
    clearUser() {
      this.$state.user = {} as AuthorisedUser;
      this.$state.token = '';
    },
  },
});
