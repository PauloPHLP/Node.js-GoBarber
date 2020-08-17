import AppError from '@shared/errors/AppError';
import FakeStorageProvider from '@shared/container/providers/StorageProvider/fakes/FakeStorageProvider';
import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import UpdateUserAvatarService from './UpdateUserAvatarService';

let fakeUsersRepository: FakeUsersRepository;
let fakeStorageProvider: FakeStorageProvider;
let updateUserAvatar: UpdateUserAvatarService;

describe('UpdateUserAvataer', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeStorageProvider = new FakeStorageProvider();
    updateUserAvatar = new UpdateUserAvatarService(
      fakeUsersRepository,
      fakeStorageProvider,
    );
  });

  it("should be able to update user's avatar", async () => {
    const user = await fakeUsersRepository.create({
      name: 'John Doe',
      email: 'john.doe@email.com',
      password: '12345',
    });

    await updateUserAvatar.execute({
      user_id: user.id,
      avatarFileName: 'avatar.png',
    });

    await expect(user.avatar).toBe('avatar.png');
  });

  it("should not be able to update user's avatar of non existing user", async () => {
    await expect(
      updateUserAvatar.execute({
        user_id: 'non-existing user',
        avatarFileName: 'avatar.png',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it("should delete old user's avatar when updating", async () => {
    const deleteFile = jest.spyOn(fakeStorageProvider, 'deleteFile');

    const user = await fakeUsersRepository.create({
      name: 'John Doe',
      email: 'john.doe@email.com',
      password: '12345',
    });

    await updateUserAvatar.execute({
      user_id: user.id,
      avatarFileName: 'avatar1.png',
    });

    await updateUserAvatar.execute({
      user_id: user.id,
      avatarFileName: 'avatar2.png',
    });

    await expect(deleteFile).toHaveBeenCalledWith('avatar1.png');
    await expect(user.avatar).toBe('avatar2.png');
  });
});
