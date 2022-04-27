import { defineStore } from 'pinia';
import { LoginFormData, UserState } from '@/types';
import { localStorage } from '@/utils/storage';
import { login, logout } from '@/api/login';
import { getUserInfo } from '@/api/system/user';

const useUserStore = defineStore({
  id: 'user',
  state: (): UserState => ({
    token: localStorage.get('token') || '',
    nickname: '',
    avatar: '',
    roles: [],
    perms: [],
  }),
  actions: {
    async RESET_STATE() {
      this.$reset();
    },
    /**
     * 用户登录请求
     * @param userInfo 登录用户信息
     *  username: 用户名
     *  password: 密码
     *  code: 验证码
     *  uuid: 匹配正确验证码的 key
     */
    login(userInfo: LoginFormData) {
      const { username, password } = userInfo;
      return new Promise((resolve, reject) => {
        login({
          username: username.trim(),
          password: password,
        })
          .then(response => {
            const { access_token, token_type } = response.data;
            const accessToken = token_type + ' ' + access_token;
            localStorage.set('token', accessToken);
            this.token = accessToken;
            resolve(access_token);
          })
          .catch(error => {
            reject(error);
          });
      });
    },
    /**
     *  获取用户信息（昵称、头像、角色集合、权限集合）
     */
    getUserInfo() {
      return new Promise((resolve, reject) => {
        getUserInfo()
          .then(({ data }) => {
            if (!data) {
              return reject('Verification failed, please Login again.');
            }
            const { nickname, avatar, roles, perms } = data;
            if (!roles || roles.length <= 0) {
              reject('getUserInfo: roles must be a non-null array!');
            }
            this.nickname = nickname;
            this.avatar = avatar;
            this.roles = roles;
            this.perms = perms;
            resolve(data);
          })
          .catch(error => {
            reject(error);
          });
      });
    },

    /**
     *  注销
     */
    logout() {
      return new Promise((resolve, reject) => {
        logout()
          .then(() => {
            localStorage.remove('token');
            this.RESET_STATE();
            resolve(null);
          })
          .catch(error => {
            reject(error);
          });
      });
    },

    /**
     * 清除 Token
     */
    resetToken() {
      return new Promise(resolve => {
        localStorage.remove('token');
        this.RESET_STATE();
        resolve(null);
      });
    },
  },
});

export default useUserStore;
