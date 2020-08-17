import AppError from '@shared/errors/AppError';
import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider';
import CreateUserSerivce from './CreateUserService';
import AuthenticateUser from './AuthenticateUserService';

let fakeUsersRepository: FakeUsersRepository;
let fakeHashProvider: FakeHashProvider;
let createUserSerivce: CreateUserSerivce;

describe('AuthenticateUser', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeHashProvider = new FakeHashProvider();
    createUserSerivce = new CreateUserSerivce(
      fakeUsersRepository,
      fakeHashProvider,
    );
  });

  it('should be able to authenticate', async () => {
    const authenticateUser = new AuthenticateUser(
      fakeUsersRepository,
      fakeHashProvider,
    );

    const user = await createUserSerivce.execute({
      name: 'John Doe',
      email: 'johndoe@email.com',
      password: '123456',
    });

    const response = await authenticateUser.execute({
      email: 'johndoe@email.com',
      password: '123456',
    });

    await expect(response).toHaveProperty('token');
    await expect(response.user).toEqual(user);
  });

  it('should not be able to authenticate with non existing user', async () => {
    const authenticateUser = new AuthenticateUser(
      fakeUsersRepository,
      fakeHashProvider,
    );

    await expect(
      authenticateUser.execute({
        email: 'johndoe@email.com',
        password: '123456',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to authenticate with wrong password', async () => {
    const authenticateUser = new AuthenticateUser(
      fakeUsersRepository,
      fakeHashProvider,
    );

    await createUserSerivce.execute({
      name: 'John Doe',
      email: 'johndoe@email.com',
      password: '123456',
    });

    await expect(
      authenticateUser.execute({
        email: 'johndoe@email.com',
        password: 'wrong-password',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
