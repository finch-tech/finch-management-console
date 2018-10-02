// @flow
export class User {
  id: string;
  email: string;
  createdAt: number;
  updatedAt: number;

  constructor(data: {
    id: string,
    email: string,
    created_at: number,
    updated_at: number
  }) {
    this.id = data.id;
    this.email = data.email;
    this.createdAt = data.created_at;
    this.updatedAt = data.updated_at;
  }
}
