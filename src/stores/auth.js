import { api } from "boot/axios";
import { defineStore } from "pinia";
import { Loading, Notify } from "quasar";

export const useAuthStore = defineStore({
  id: "auth",
  state: () => ({
    token: localStorage.getItem("user-token") || "",
    type: localStorage.getItem("user-login") || "test",
    userName: localStorage.getItem("user-name") || "",
  }),
  getters: {
    isAuthenticated: (state) => !!state.token,
    isAdmin: (state) => state.type === "admin",
    getToken: (state) => state.token,
    getUserId: (state) => state.userId,
    getProfile: (state) => state.profile,
  },
  actions: {
    async login(login, password) {
      try {
        Loading.show();
        // const response = await api({
        //   url: "http://localhost:7000/api/auth/login",
        //   method: "post",
        //   data: { username: login, password },
        // });
        // if (!response.access_token) throw new Error("Ошибка авторизации");
        // console.log(response);
        // const { access_token } = response;
        // console.log(access_token);

        localStorage.setItem("user-token", "token");

        // localStorage.setItem("user-type", type);
        // localStorage.setItem("user-id", userid);
        // api.defaults.headers.common["Authorization"] = `Bearer ${access_token}`;
        this.token = "token";
        // this.type = type;
        // this.userId = userid;
        //
        // const profile = await this.loadProfile();
        this.router.push("/main");
        Notify.create({
          message: "Вы авторизованы",
          type: "positive",
        });
        return true;
      } catch (e) {
        Notify.create({
          message: "Ошибка авторизации",
          caption: e?.message || "",
          type: "negative",
          color: "primary",
        });
        console.error(e);
      } finally {
        Loading.hide();
      }
    },
    async loadProfile() {
      try {
        const { data } = await api({
          url: `/api/v1/profile`,
          method: "get",
        });
        if (data) {
          localStorage.setItem("profile", JSON.stringify(data));
          this.profile = data;
        }
        return data;
      } catch (e) {
        Notify.create({
          type: "negative",
          color: "primary",
          message: "Ошибка загрузки профиля",
        });
      }
    },
    async logout() {
      localStorage.removeItem("user-token");
      // localStorage.removeItem("user-type");
      localStorage.removeItem("user-name");
      localStorage.removeItem("user-login");
      // delete api.defaults.headers.common["Authorization"];
      this.token = "";
      // this.type = "guest";
      this.userName = 0;
      this.router.push("/login");
    },
    async registration(
      name = "NameUser",
      login = "testLogin",
      password = "testPassword"
    ) {
      localStorage.setItem("user-token", password);
      localStorage.setItem("user-login", login);
      localStorage.setItem("user-name", name);
      this.token = password;
      this.router.push("/main");
    },
  },
});
