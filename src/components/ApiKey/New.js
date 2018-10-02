// @flow
import React, { Component } from "react";
import { observable } from "mobx";
import { observer, inject } from "mobx-react";

import { Modal } from "../../components";
import type { ClientTokenStore } from "../../stores";

type Props = {
  storeId: string,
  clientTokenStore: ClientTokenStore,
  location: Object,
  history: Object,
  match: Object
};

@inject("clientTokenStore")
@observer
export class NewApiKey extends Component<Props> {
  @observable
  formData = {
    name: "",
    domain: ""
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
      case "domain":
        formData.domain = event.target.value;
        break;
    }

    this.formData = formData;
  };

  handleSubmit = async (event: SyntheticInputEvent<EventTarget>) => {
    event.preventDefault();

    const { storeId } = this.props;
    const { clientTokenStore } = this.props;

    try {
      await clientTokenStore.createToken(
        storeId,
        this.formData.name,
        this.formData.domain
      );

      this.props.history.push(`/stores/${storeId}/api_keys`);
    } catch (error) {
      this.flash = {
        message: "Failed to create API key",
        type: "red"
      };
      return;
    }
  };

  componentDidMount() {
    setTimeout(() => {
      this.active = true;
    }, 100);
  }

  render() {
    const { storeId } = this.props;
    const { loading } = this.props.clientTokenStore;

    return (
      <Modal
        close={() => this.props.history.push(`/stores/${storeId}/api_keys`)}
      >
        <div className="full-form">
          <div className="title">
            <h1>Create New API Key</h1>
          </div>

          <form className="form-control" onSubmit={this.handleSubmit}>
            {this.flash && (
              <div className={`notify ${this.flash.type}`}>
                {this.flash.message}
              </div>
            )}

            <label>
              <span className="input-name">Name</span>
              <input
                type="text"
                name="name"
                placeholder="Enter any name"
                value={this.formData.name}
                onChange={this.handleChange}
              />
              <span className="note">You can use any name you want.</span>
            </label>
            <label>
              <span className="input-name">Request Origin Domain</span>
              <input
                type="text"
                name="domain"
                placeholder="Enter domain"
                value={this.formData.domain}
                onChange={this.handleChange}
              />
              <span className="note">
                Request origin domain is the domain from which API requests are
                sent using this API key. This must match what payment gateway
                server receives via origin header.
              </span>
            </label>
            <button
              className={`btn primary ${loading && "loading"}`}
              type="submit"
              disabled={loading}
            >
              Create Key
              <div className="loader" />
            </button>
          </form>
        </div>
      </Modal>
    );
  }
}
