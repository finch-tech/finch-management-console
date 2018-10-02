// @flow
import { observable, action } from "mobx";
import axios from "axios";
import url from "url";

import config from "../config.js";
import { ClientToken } from "../models";
import type { RootStore } from "./";

export class ClientTokenStore {
  @observable
  loading: boolean = false;

  @observable
  tokens: Array<ClientToken> = [];

  @observable
  token: ClientToken;

  rootStore: RootStore;
  apiUrl: string;

  constructor(rootStore: RootStore) {
    this.rootStore = rootStore;
    this.apiUrl = url.format(config.api);
  }

  @action
  async createToken(
    storeId: string,
    name: string,
    domain: string
  ): Promise<ClientToken> {
    this.loading = true;

    try {
      const response = await axios.post(
        url.resolve(this.apiUrl, "/client_tokens"),
        {
          store_id: storeId,
          name,
          domain,
          typ: "web"
        },
        {
          headers: {
            Authorization: `Bearer ${this.rootStore.authStore.authToken}`
          }
        }
      );

      this.loading = false;
      const token = new ClientToken(response.data);
      this.tokens = this.tokens.concat(token);
      return token;
    } catch (error) {
      this.loading = false;
      throw error;
    }
  }

  @action
  async loadToken(id: string): Promise<ClientToken> {
    this.loading = true;

    try {
      const response = await axios.get(
        url.resolve(this.apiUrl, `/client_tokens/${id}`),
        {
          headers: {
            Authorization: `Bearer ${this.rootStore.authStore.authToken}`
          }
        }
      );

      this.loading = false;
      this.token = new ClientToken(response.data);
      return this.token;
    } catch (error) {
      this.loading = false;
      throw error;
    }
  }

  @action
  async loadTokens(store_id: string): Promise<Array<ClientToken>> {
    this.loading = true;

    try {
      const response = await axios.get(
        url.resolve(this.apiUrl, `/client_tokens`),
        {
          params: {
            store_id,
            limit: 15,
            offset: 0
          },
          headers: {
            Authorization: `Bearer ${this.rootStore.authStore.authToken}`
          }
        }
      );

      this.loading = false;
      this.tokens = response.data.client_tokens.map(
        data => new ClientToken(data)
      );
      return this.tokens;
    } catch (error) {
      this.loading = false;
      throw error;
    }
  }

  @action
  async deleteToken(id: string): Promise<void> {
    this.loading = true;

    try {
      await axios.delete(url.resolve(this.apiUrl, `/client_tokens/${id}`), {
        headers: {
          Authorization: `Bearer ${this.rootStore.authStore.authToken}`
        }
      });

      this.loading = false;
      this.tokens = this.tokens.filter(token => token.id != id);

      this.token = null;
    } catch (error) {
      this.loading = false;
      throw error;
    }
  }
}
