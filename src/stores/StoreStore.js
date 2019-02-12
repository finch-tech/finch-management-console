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

  constructor(rootStore: RootStore) {
    this.rootStore = rootStore;
  }

  @action
  async createStore(name: string, description: string): Promise<Store> {
    this.loading = true;

    try {
      const response = await axios.post(
        url.format({
          ...config.api,
          pathname: "/stores"
        }),
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
        url.format({
          ...config.api,
          pathname: `/stores/${id}`
        }),
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
      const response = await axios.get(
        url.format({
          ...config.api,
          pathname: "/stores"
        }),
        {
          headers: {
            Authorization: `Bearer ${this.rootStore.authStore.authToken}`
          }
        }
      );

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
      ethPayoutAddress: string,
      ethConfirmationsRequired: number,
      btcPayoutAddress: string,
      btcConfirmationsRequired: number
    }
  ): Promise<Store> {
    this.loading = true;

    const payload = {
      eth_payout_addresses: data.ethPayoutAddress
        ? [data.ethPayoutAddress]
        : null,
      eth_confirmations_required: data.ethConfirmationsRequired,
      btc_payout_addresses: data.btcPayoutAddress
        ? [data.btcPayoutAddress]
        : null,
      btc_confirmations_required: data.btcConfirmationsRequired
    };

    try {
      const response = await axios.patch(
        url.format({
          ...config.api,
          pathname: `/stores/${storeId}`
        }),
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

  @action
  async deleteStore(storeId: string): Promise<void> {
    this.loading = true;

    try {
      await axios.delete(
        url.format({
          ...config.api,
          pathname: `/stores/${storeId}`
        }),
        {
          headers: {
            Authorization: `Bearer ${this.rootStore.authStore.authToken}`
          }
        }
      );

      this.loading = false;
      this.stores = this.stores.filter(store => store.id != storeId);
      return;
    } catch (error) {
      this.loading = false;
      throw error;
    }
  }
}
