// @flow
import { AuthStore, StoreStore, ClientTokenStore } from "./";

export class RootStore {
  authStore: AuthStore;
  storeStore: StoreStore;
  clientTokenStore: ClientTokenStore;

  constructor() {
    this.authStore = new AuthStore(this);
    this.storeStore = new StoreStore(this);
    this.clientTokenStore = new ClientTokenStore(this);
  }
}
