// @flow
import React, { Component } from "react";
import { observable } from "mobx";
import { observer, inject } from "mobx-react";
import { parse } from "query-string";

import { Modal } from "../../components";
import type { StoreStore } from "../../stores";

type Props = {
  storeStore: StoreStore,
  location: Object,
  history: Object
};

@inject("storeStore")
@observer
export class NewStore extends Component<Props> {
  @observable
  activated: boolean = false;

  @observable
  formData = {
    name: "",
    description: ""
  };

  @observable
  flash: Object;

  @observable
  active: boolean = false;

  handleChange = (event: SyntheticInputEvent<EventTarget>) => {
    let formData = this.formData;

    switch (event.target.name) {
      case "name":
        formData.name = event.target.value;
        break;
      case "description":
        formData.description = event.target.value;
        break;
    }

    this.formData = formData;
  };

  handleSubmit = async (event: SyntheticInputEvent<EventTarget>) => {
    event.preventDefault();

    const { storeStore } = this.props;

    try {
      const store = await storeStore.createStore(
        this.formData.name,
        this.formData.description
      );

      this.props.history.push(`/stores/${store.id}`);
    } catch (error) {
      this.flash = {
        message: "Failed to create new store",
        type: "red"
      };
      return;
    }
  };

  componentDidMount() {
    const query = parse(this.props.location.search);

    if (query.flash) {
      this.activated = true;
    }

    setTimeout(() => {
      this.active = true;
    }, 100);
  }

  render() {
    const { loading } = this.props.storeStore;

    return (
      <Modal close={() => this.props.history.push("/stores")}>
        <div className="full-form">
          {this.activated && (
            <div className="notify green">
              You successfully verified your email.
            </div>
          )}

          <div className="title">
            <h1>Create New Store</h1>
          </div>

          <form className="form-control" onSubmit={this.handleSubmit}>
            {this.flash && (
              <div className={`notify ${this.flash.type}`}>
                {this.flash.message}
              </div>
            )}

            <label>
              <span className="input-name">Store Name</span>
              <input
                type="text"
                name="name"
                placeholder="Store name"
                value={this.formData.name}
                onChange={this.handleChange}
              />
            </label>
            <label>
              <span className="input-name">Store Description</span>
              <input
                type="text"
                name="description"
                placeholder="Describe your store."
                value={this.formData.description}
                onChange={this.handleChange}
              />
            </label>
            <button
              className={`btn primary ${loading && "loading"}`}
              type="submit"
              disabled={loading}
            >
              Create Store
              <div className="loader" />
            </button>
          </form>
        </div>
      </Modal>
    );
  }
}
