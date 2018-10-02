// @flow
import React, { Component } from "react";
import { observer, inject } from "mobx-react";

import type { StoreStore } from "../../stores";

type Props = {
  storeStore: StoreStore,
  match: Object
};

@inject("storeStore")
@observer
export class PublicKeyMain extends Component<Props> {
  render() {
    const { store } = this.props.storeStore;

    return (
      <div className="store-content">
        <div className="content-box">
          <h2 className="content-title">Public Key</h2>
          <p className="content-description">
            Please use this public key to verfiy the payment voucher JWT on your
            server.
          </p>
          <div className="read-only">{store.publicKey}</div>
        </div>
      </div>
    );
  }
}
