export class User {
  id: number;
  name: string;
  email: string;
  role: string;
  imageUrl: string;
  constructor(id: number, name: string, email: string) {
    this.id = id;
    this.name = name;
    this.email = email;
  }
}
