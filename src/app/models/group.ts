import { User } from './user';
export class Group {
  id: number;
  name: string;
  members: User[];
  constructor(id: number, name: string, members: User[]) {
    this.id = id;
    this.name = name;
    this.members = members;
  }
}
