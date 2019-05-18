// @flow
import React, { Component } from "react";
import { observable } from "mobx";
import { observer, inject } from "mobx-react";

import type { StoreStore } from "../../stores";

type Props = {
  storeId: string,
  storeStore: StoreStore,
  match: Object
};

@inject("storeStore")
@observer
export class EthSettings extends Component<Props> {
  @observable
  formData = {
    payoutAddress: "",
    confirmationsRequired: ""
  };

  @observable
  flash: Object;

  constructor(props: Props) {
    super(props);

    this.formData.payoutAddress = props.storeStore.store.ethPayoutAddress;
    this.formData.confirmationsRequired =
      props.storeStore.store.ethConfirmationsRequired;
  }

  handleChange = (event: SyntheticInputEvent<EventTarget>) => {
    let formData = this.formData;

    switch (event.target.name) {
      case "payoutAddress":
        formData.payoutAddress = event.target.value;
        break;
      case "confirmationsRequired":
        formData.confirmationsRequired = event.target.value;
        break;
    }

    this.formData = formData;
  };

  handleSubmit = async (event: SyntheticInputEvent<EventTarget>) => {
    event.preventDefault();

    const { storeId, storeStore } = this.props;

    try {
      let parsed = parseInt(this.formData.confirmationsRequired);

      await storeStore.updateStore(storeId, {
        ethPayoutAddress: this.formData.payoutAddress,
        ethConfirmationsRequired: isNaN(parsed) ? null : parsed
      });

      this.flash = {
        message: "Updated settings",
        type: "green"
      };
    } catch (error) {
      this.flash = {
        message: "Failed to update ethereum settings",
        type: "red"
      };
      return;
    }
  };

  render() {
    const { loading } = this.props.storeStore;

    return (
      <div className="currency-settings">
        <form className="form-control" onSubmit={this.handleSubmit}>
          {this.flash && (
            <div className={`notify ${this.flash.type}`}>
              {this.flash.message}
            </div>
          )}

          <label>
            <span className="input-name">Payout Address</span>
            <input
              type="text"
              name="payoutAddress"
              placeholder="Enter your payout address"
              value={this.formData.payoutAddress}
              onChange={this.handleChange}
            />
            <span className="note">
              An ethereum address on which you want to receive your ether. Your
              customers pay ether to proxy address we create for each payment
              session, the system automatically check the amount paid and
              forwatd ether to your payout address.
            </span>
          </label>
          <label>
            <span className="input-name">Confirmations Required</span>
            <input
              type="text"
              name="confirmationsRequired"
              placeholder="Enter required number of confirmations"
              value={this.formData.confirmationsRequired}
              onChange={this.handleChange}
            />
            <span className="note">
              Number of confirmation means how many blocks are mined after a
              transaction is included in a block. Most of time, 1 confirmation
              is enough to be sure that payment transaction is included in
              blockchain. Only if you need more reliability, for example when
              you are receiving huge amount per a transaction, set this to
              higher number.
            </span>
          </label>
          <button
            className={`btn primary ${loading && "loading"}`}
            type="submit"
            disabled={loading}
          >
            Save
            <div className="loader" />
          </button>
        </form>
      </div>
    );
  }
}
