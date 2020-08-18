import AppError from '@shared/errors/AppError';

import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider';
import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import UpdateProfileService from './UpdateProfileService';

let fakeUsersRepository: FakeUsersRepository;
let fakeHashProvider: FakeHashProvider;
let updateProfile: UpdateProfileService;

describe('UpdateProfile', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeHashProvider = new FakeHashProvider();
    updateProfile = new UpdateProfileService(
      fakeUsersRepository,
      fakeHashProvider,
    );
  });

  it("should be able to update user's profile", async () => {
    const user = await fakeUsersRepository.create({
      name: 'John Doe',
      email: 'john.doe@email.com',
      password: '12345',
    });

    const updatedUser = await updateProfile.execute({
      user_id: user.id,
      name: 'John Trê',
      email: 'john.tre@email.com',
    });

    await expect(updatedUser.name).toBe('John Trê');
    await expect(updatedUser.email).toBe('john.tre@email.com');
  });

  it('should not be able to update non-existing user profile', async () => {
    await expect(
      updateProfile.execute({
        user_id: 'non-existing user id',
        name: 'test',
        email: 'test@mail.com',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to change to an existing email', async () => {
    await fakeUsersRepository.create({
      name: 'John Doe',
      email: 'john.doe@email.com',
      password: '12345',
    });

    const user2 = await fakeUsersRepository.create({
      name: 'Test',
      email: 'test@email.com',
      password: '12345',
    });

    await expect(
      updateProfile.execute({
        user_id: user2.id,
        name: 'Test',
        email: 'john.doe@email.com',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it("should be able to update user's password", async () => {
    const user = await fakeUsersRepository.create({
      name: 'John Doe',
      email: 'john.doe@email.com',
      password: '12345',
    });

    const updatedUser = await updateProfile.execute({
      user_id: user.id,
      name: 'John Trê',
      email: 'john.tre@email.com',
      old_password: '12345',
      password: '123123',
    });

    await expect(updatedUser.password).toBe('123123');
  });

  it("should not be able to update user's password without old password", async () => {
    const user = await fakeUsersRepository.create({
      name: 'John Doe',
      email: 'john.doe@email.com',
      password: '12345',
    });

    expect(
      updateProfile.execute({
        user_id: user.id,
        name: 'John Trê',
        email: 'john.tre@email.com',
        password: '123123',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it("should not be able to update user's password with wrong old password", async () => {
    const user = await fakeUsersRepository.create({
      name: 'John Doe',
      email: 'john.doe@email.com',
      password: '12345',
    });

    expect(
      updateProfile.execute({
        user_id: user.id,
        name: 'John Trê',
        email: 'john.tre@email.com',
        old_password: '123122',
        password: '123123',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
