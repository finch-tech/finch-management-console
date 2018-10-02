// @flow
import React, { Component } from "react";
import { observer, inject } from "mobx-react";
import { Route, Switch } from "react-router-dom";

import { NewApiKey, ApiKeyMain } from "../";
import type { StoreStore, ClientTokenStore } from "../../stores";

type Props = {
  storeStore: StoreStore,
  clientTokenStore: ClientTokenStore,
  match: Object,
  history: Object
};

@inject("storeStore")
@inject("clientTokenStore")
@observer
export class ApiKeyList extends Component<Props> {
  async componentDidMount() {
    try {
      const { store } = this.props.storeStore;
      await this.props.clientTokenStore.loadTokens(store.id);
    } catch (error) {
      return;
    }
  }

  render() {
    require("./scss/List.scss");

    const { store } = this.props.storeStore;
    const { tokens } = this.props.clientTokenStore;

    return (
      <div className="store-content">
        <div className="content-box">
          <div className="store-content-header">
            <h2 className="content-title">API Key</h2>
            <button
              className="btn primary"
              onClick={() =>
                this.props.history.push(`/stores/${store.id}/api_keys/new`)
              }
            >
              Create New Key
            </button>
          </div>
          <p className="content-description">
            API key is used, in most cases by our SDK, to make API request to
            start a new payment session. For more details, please click created
            tokens below.
          </p>

          <ul className="api-key-list">
            {tokens.map(token => (
              <li
                key={token.id}
                className="api-key-item"
                onClick={() =>
                  this.props.history.push(
                    `/stores/${store.id}/api_keys/${token.id}`
                  )
                }
              >
                <h3 className="api-key-name">{token.name}</h3>
                <span className="domain">({token.domain})</span>
                <span className="api-key">{token.token}</span>
              </li>
            ))}
          </ul>

          <Switch>
            <Route
              exact
              path={`/stores/${store.id}/api_keys/new`}
              render={props => <NewApiKey storeId={store.id} {...props} />}
            />
            <Route
              exact
              path={`/stores/${store.id}/api_keys/:tokenId`}
              render={props => <ApiKeyMain storeId={store.id} {...props} />}
            />
          </Switch>
        </div>
      </div>
    );
  }
}
