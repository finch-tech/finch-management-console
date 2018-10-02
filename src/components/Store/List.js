// @flow
import React, { Component } from "react";
import { observer, inject } from "mobx-react";
import { Route, Switch } from "react-router-dom";
import Masonry from "react-masonry-component";

import { NewStore } from "../";
import type { StoreStore } from "../../stores";

type Props = {
  storeStore: StoreStore,
  history: Object
};

@inject("storeStore")
@observer
export class StoreList extends Component<Props> {
  async componentDidMount() {
    try {
      await this.props.storeStore.loadStores();
    } catch (error) {
      return;
    }
  }

  render() {
    require("./scss/List.scss");
    const { stores } = this.props.storeStore;

    return (
      <div className="container">
        <div className="title">
          <h1>Your Stores</h1>
        </div>
        <button
          className="btn primary"
          onClick={() => this.props.history.push("/stores/new")}
        >
          Create New Store
        </button>

        <Masonry
          options={{
            gutter: 32,
            transitionDuration: 0,
            itemSelector: ".store-item",
            horizontalOrder: true,
            fitWidth: true
          }}
          className="store-list"
          elementType={"ul"}
        >
          {stores.map(store => (
            <li
              key={store.id}
              className="store-item"
              onClick={() => this.props.history.push(`/stores/${store.id}`)}
            >
              <div
                className="store-color"
                style={{ borderColor: store.color }}
              />
              <h3 className="store-name">{store.name}</h3>
              <p className="store-description">{store.description}</p>
            </li>
          ))}
        </Masonry>

        <Switch>
          <Route exact path="/stores/new" component={NewStore} />
        </Switch>
      </div>
    );
  }
}
