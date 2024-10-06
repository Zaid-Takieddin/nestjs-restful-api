import { Injectable } from '@nestjs/common';

@Injectable()
export class UsersService {
  private users = [
    {
      id: '1',
      name: 'Dave',
      email: 'dave@gmail.com',
      role: 'admin',
    },
    {
      id: '2',
      name: 'Pattrick',
      email: 'pattrick@gmail.com',
      role: 'intern',
    },
  ];

  findAll(role?: 'admin' | 'intern') {
    if (role) return this.users.filter((user) => user.role === role);

    return this.users;
  }

  findOne(id: string) {
    const user = this.users.find((user) => user.id === id);
    return user;
  }

  create(user: { name: string; email: string; role: 'admin' | 'intern' }) {
    const usersByHighestId = [...this.users].sort(
      (a, b) => Number(b.id) - Number(a.id),
    );

    const newUser = {
      id: (Number(usersByHighestId[0].id) + 1).toString(),
      ...user,
    };
    this.users.push(newUser);
    return newUser;
  }

  update(
    id: string,
    user: { name?: string; email?: string; role?: 'admin' | 'intern' },
  ) {
    this.users = this.users.map((u) => {
      if (u.id === id) return { ...u, ...user };
      return u;
    });

    return this.findOne(id);
  }

  delete(id: string) {
    const removedUser = this.findOne(id);

    this.users = this.users.filter((user) => user.id !== removedUser.id);

    return removedUser;
  }
}
