import { User } from '../types/dbTypes';

function confirmUser(user: User): string {
    return `Your username is: ${user.name}`;
  }

describe('greetUser function', () => {
  it('should greet the user by name', () => {
    const user: User = {
      _id: 1,
      email: 'johndoe@test.org',
      name: 'John Doe',
      given_name: 'John',
      family_name: 'Doe',
      picture: 'profile.png',
    };
    expect(confirmUser(user)).toBe('Your username is: John Doe');
  });
});
