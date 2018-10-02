// @flow
import ColorHash from "color-hash";

export class Store {
  id: string;
  name: string;
  description: string;
  ethPayoutAddress: string;
  ethConfirmationsRequired: string;
  color: string;
  publicKey: string;
  canAcceptEth: boolean;
  canAcceptBtc: boolean;
  createdAt: number;
  updatedAt: number;

  constructor(data: {
    id: string,
    name: string,
    description: string,
    eth_payout_addresses: Array<string>,
    eth_confirmations_required: string,
    public_key: string,
    can_accept_eth: boolean,
    can_accept_btc: boolean,
    created_at: number,
    updated_at: number
  }) {
    const colorHash = new ColorHash({ saturation: 1.0 });

    this.id = data.id;
    this.name = data.name;
    this.description = data.description;
    this.ethPayoutAddress = data.eth_payout_addresses
      ? data.eth_payout_addresses[0]
      : "";
    this.ethConfirmationsRequired = data.eth_confirmations_required;
    this.color = colorHash.hex(data.name);
    this.publicKey = data.public_key;
    this.canAcceptEth = data.can_accept_eth;
    this.canAcceptBtc = data.can_accept_btc;
    this.createdAt = data.created_at;
    this.updatedAt = data.updated_at;
  }
}
