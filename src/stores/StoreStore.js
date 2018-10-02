// @flow
import { observable, action } from "mobx";
import axios from "axios";
import url from "url";

import config from "../config.js";
import { Store } from "../models";
import type { RootStore } from "./";

export class StoreStore {
  @observable
  loading: boolean = false;

  @observable
  store: Store;

  @observable
  stores: Array<Store> = [];

  rootStore: RootStore;
  apiUrl: string;

  constructor(rootStore: RootStore) {
    this.rootStore = rootStore;
    this.apiUrl = url.format(config.api);
  }

  @action
  async createStore(name: string, description: string): Promise<Store> {
    this.loading = true;

    try {
      const response = await axios.post(
        url.resolve(this.apiUrl, "/stores"),
        {
          name,
          description
        },
        {
          headers: {
            Authorization: `Bearer ${this.rootStore.authStore.authToken}`
          }
        }
      );

      this.loading = false;
      const store = new Store(response.data);
      this.stores = this.stores.concat(store);
      return store;
    } catch (error) {
      this.loading = false;
      throw error;
    }
  }

  @action
  async loadStore(id: string): Promise<Store> {
    this.loading = true;

    try {
      const response = await axios.get(
        url.resolve(this.apiUrl, `/stores/${id}`),
        {
          headers: {
            Authorization: `Bearer ${this.rootStore.authStore.authToken}`
          }
        }
      );

      this.loading = false;
      this.store = new Store(response.data);
      return this.store;
    } catch (error) {
      this.loading = false;
      throw error;
    }
  }

  @action
  async loadStores(): Promise<Array<Store>> {
    this.loading = true;

    try {
      const response = await axios.get(url.resolve(this.apiUrl, `/stores`), {
        headers: {
          Authorization: `Bearer ${this.rootStore.authStore.authToken}`
        }
      });

      this.loading = false;
      this.stores = response.data.stores.map(data => new Store(data));
      return this.stores;
    } catch (error) {
      this.loading = false;
      throw error;
    }
  }

  @action
  async updateStore(
    storeId: string,
    data: {
      payoutAddress: string,
      confirmationsRequired: string
    }
  ): Promise<Store> {
    this.loading = true;

    const payload = {
      eth_payout_addresses: data.payoutAddress ? [data.payoutAddress] : null,
      eth_confirmations_required: data.confirmationsRequired || null
    };

    try {
      const response = await axios.patch(
        url.resolve(this.apiUrl, `/stores/${storeId}`),
        payload,
        {
          headers: {
            Authorization: `Bearer ${this.rootStore.authStore.authToken}`
          }
        }
      );

      this.loading = false;
      this.store = new Store(response.data);
      return this.store;
    } catch (error) {
      this.loading = false;
      throw error;
    }
  }
}
