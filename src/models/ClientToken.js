// @flow
export class ClientToken {
  id: string;
  name: string;
  token: string;
  storeId: string;
  domain: string;
  createdAt: number;
  typ: string;

  constructor(data: {
    id: string,
    name: string,
    token: string,
    store_id: string,
    domain: string,
    created_at: number,
    typ: string
  }) {
    this.id = data.id;
    this.name = data.name;
    this.token = data.token;
    this.storeId = data.store_id;
    this.domain = data.domain;
    this.createdAt = data.created_at;
    this.typ = data.typ;
  }
}
