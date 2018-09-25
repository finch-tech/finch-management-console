// @flow
import { observable, action } from "mobx";
import axios from "axios";
import Cookie from "js-cookie";
import url from "url";

import config from "../config.js";
import type { RootStore } from "./";

export class AuthStore {
  @observable
  account: string;
  @observable
  loading: boolean = false;
  @observable
  isAuthenticated: boolean = false;

  rootStore: RootStore;
  apiUrl: string;

  constructor(rootStore: RootStore) {
    this.rootStore = rootStore;
    this.apiUrl = url.format(config.api);
  }

  updateAuthenticationStatus(): void {
    this.isAuthenticated = !!Cookie.get("auth-token");
  }

  @action
  async signUp(email: string, password: string): Promise<Object> {
    this.loading = true;

    try {
      const response = await axios.post(
        url.resolve(this.apiUrl, "/registration"),
        {
          email,
          password
        },
        {
          headers: {}
        }
      );

      this.loading = false;
      return response.data;
    } catch (error) {
      this.loading = false;
      throw error;
    }
  }

  @action
  async login(email: string, password: string): Promise<Object> {
    this.loading = true;

    try {
      const response = await axios.post(
        url.resolve(this.apiUrl, "/login"),
        {
          email,
          password
        },
        {
          headers: {}
        }
      );

      Cookie.set("auth-token", response.data.token);
      this.loading = false;
      return response.data;
    } catch (error) {
      this.loading = false;
      throw error;
    }
  }

  @action
  async activate(token: String): Promise<Object> {
    this.loading = true;

    try {
      const response = await axios.post(
        url.resolve(this.apiUrl, "/activation"),
        { token },
        {
          headers: {}
        }
      );

      Cookie.set("auth-token", response.data.token);
      this.loading = false;
      return response.data;
    } catch (error) {
      this.loading = false;
      throw error;
    }
  }

  @action
  logout(): void {
    Cookie.remove("auth-token");
    this.isAuthenticated = false;
  }
}
