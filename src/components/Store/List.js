// @flow
import React, { Component } from "react";
import { observable } from "mobx";
import { observer, inject } from "mobx-react";
import { Route, Switch } from "react-router-dom";
import Masonry from "react-masonry-component";
import changeCase from "change-case";

import { NewStore } from "../";
import type { StoreStore } from "../../stores";

type ItemProps = {
  storeStore: StoreStore,
  history: Object,
  store: Object
};

@inject("storeStore")
@observer
class StoreItem extends Component<ItemProps> {
  @observable
  settingsTab: boolean = false;

  delete = (event: SyntheticInputEvent<EventTarget>) => {
    event.preventDefault();
    this.props.storeStore.deleteStore(this.props.store.id);
  };

  toggleSettingsTab = (event: SyntheticInputEvent<EventTarget>) => {
    event.preventDefault();
    event.stopPropagation();

    this.settingsTab = !this.settingsTab;
    if (this.settingsTab) {
      const el: any = event.target.closest(".btn-store-settings");

      const close = (e: SyntheticInputEvent<EventTarget>) => {
        if (el.contains(e.target)) return;
        this.settingsTab = false;
        (document.body: any).removeEventListener("click", close);
      };
      (document.body: any).addEventListener("click", close);
    }
  };

  render() {
    const { store } = this.props;

    return (
      <li
        key={store.id}
        className="store-item"
        style={{ borderColor: store.color }}
        onClick={() => this.props.history.push(`/stores/${store.id}`)}
      >
        <button onClick={this.toggleSettingsTab} className="btn-store-settings">
          <i className="settings-icon" />
          {this.settingsTab && (
            <div className="settings-tab">
              <ul>
                <li onClick={this.delete}>Delete</li>
              </ul>
            </div>
          )}
        </button>

        <h3 className="store-name">{changeCase.titleCase(store.name)}</h3>
        <p className="store-description">{store.description}</p>
      </li>
    );
  }
}

type ListProps = {
  storeStore: StoreStore,
  history: Object,
  store: Object
};

@inject("storeStore")
@observer
export class StoreList extends Component<ListProps> {
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
            <StoreItem key={store.id} store={store} {...this.props} />
          ))}
        </Masonry>

        <Switch>
          <Route exact path="/stores/new" component={NewStore} />
        </Switch>
      </div>
    );
  }
}
