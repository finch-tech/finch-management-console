// @flow
import React, { Component } from "react";
import { observable } from "mobx";
import { observer, inject } from "mobx-react";

import { Modal } from "../../components";
import type { ClientTokenStore } from "../../stores";

type Props = {
  storeId: string,
  tokenId: string,
  clientTokenStore: ClientTokenStore,
  location: Object,
  history: Object,
  match: Object
};

@inject("clientTokenStore")
@observer
export class ApiKeyMain extends Component<Props> {
  @observable
  active: boolean = false;

  async componentDidMount() {
    setTimeout(() => {
      this.active = true;
    }, 100);

    const { tokenId } = this.props.match.params;

    try {
      await this.props.clientTokenStore.loadToken(tokenId);
    } catch (error) {
      return;
    }
  }

  handleSubmit = async (event: SyntheticInputEvent<EventTarget>) => {
    event.preventDefault();

    const { clientTokenStore, storeId } = this.props;

    try {
      await clientTokenStore.deleteToken(clientTokenStore.token.id);

      this.props.history.push(`/stores/${storeId}/api_keys`);
    } catch (error) {
      return;
    }
  };

  render() {
    const { token, loading } = this.props.clientTokenStore;
    const { storeId } = this.props;

    return (
      <Modal
        close={() => this.props.history.push(`/stores/${storeId}/api_keys`)}
      >
        {token ? (
          <div className="full-form">
            <div className="title">
              <h1>{token.name}</h1>
            </div>

            <form className="form-control" onSubmit={this.handleSubmit}>
              <label>
                <span className="input-name">API Key</span>
                <div className="read-only">{token.token}</div>
                <span className="note">
                  API key is used, in most cases by our SDK, to make API request
                  to start a new payment session.
                </span>
              </label>
              <label>
                <span className="input-name">Request Origin Domain</span>
                <div className="read-only">{token.domain}</div>
                <span className="note">
                  Request origin domain is the domain from which API requests
                  are sent using this API key. This must match what payment
                  gateway server receives via origin header.
                </span>
              </label>
              <label>
                <span className="input-name">Javascript SDK Example</span>
                <div className="read-only">
                  <pre>
                    <code>
                      {`
                        window.onload = function () {
                            let cryptoCheckout = new CryptoCheckout({
                                apiUrl: 'YOUR_API_URL',
                                apiKey: '${token.token}',
                                amount: 5, // Payment amount in USD.
                                button: document.getElementById('pay-with-ethereum'),
                                onSuccess: function (voucher) {
                                    // Send the payment voucher to your server and verify the payment.
                                    console.log("Successfully completed the payment.", voucher);
                                }
                            });
                            cryptoCheckout.init();
                        }
                    `}
                    </code>
                  </pre>
                </div>
                <span className="note">
                  This is the example showing how you can add payment button on
                  your web page using the API key.
                </span>
              </label>
              <button
                className={`btn danger ${loading && "loading"}`}
                type="submit"
                disabled={loading}
              >
                Delete Key
                <div className="loader" />
              </button>
            </form>
          </div>
        ) : (
          <div className="page-loader" />
        )}
      </Modal>
    );
  }
}
