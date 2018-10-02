// @flow
import { observable, action } from "mobx";
import axios from "axios";
import Cookie from "js-cookie";
import url from "url";

import config from "../config.js";
import { User } from "../models";
import type { RootStore } from "./";

export class AuthStore {
  @observable
  account: User;

  @observable
  loading: boolean = false;

  @observable
  authToken: string = "";

  rootStore: RootStore;
  apiUrl: string;

  constructor(rootStore: RootStore) {
    this.rootStore = rootStore;
    this.apiUrl = url.format(config.api);
  }

  @action
  updateAuthenticationStatus(): void {
    if (!this.authToken) {
      this.authToken = Cookie.get("auth-token");
    }
  }

  @action
  async signUp(email: string, password: string): Promise<User> {
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
      return new User(response.data);
    } catch (error) {
      this.loading = false;
      throw error;
    }
  }

  @action
  async login(email: string, password: string): Promise<User> {
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
      this.account = new User(response.data.user);
      this.loading = false;
      return this.account;
    } catch (error) {
      this.loading = false;
      throw error;
    }
  }

  @action
  async activate(token: String): Promise<User> {
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
      this.account = new User(response.data.user);
      this.loading = false;
      return this.account;
    } catch (error) {
      this.loading = false;
      throw error;
    }
  }

  @action
  logout(): void {
    Cookie.remove("auth-token");
    this.authToken = "";
  }

  @action
  async loadAccount(): Promise<User> {
    this.loading = true;

    try {
      const response = await axios.get(url.resolve(this.apiUrl, "/profile"), {
        headers: {
          Authorization: `Bearer ${this.authToken}`
        }
      });

      this.account = new User(response.data);
      this.loading = false;
      return this.account;
    } catch (error) {
      this.loading = false;
      throw error;
    }
  }
}
