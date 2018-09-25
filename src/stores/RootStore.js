// @flow
import { AuthStore } from "./";

export class RootStore {
  authStore: AuthStore;

  constructor() {
    this.authStore = new AuthStore(this);
  }
}
