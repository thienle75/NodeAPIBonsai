import { initDb } from '../../../tests/utils/db';
import { upsertUser, getUserById } from '../user';

describe('upsertUser', () => {
  initDb();

  it('Should create a new user', async () => {
    await upsertUser({
      publicId: '22',
      email: 'test@test.com',
      username: 'test',
      phone: '111-111-1111',
    });
    const upsertedUser = await getUserById('22');
    expect(upsertedUser).toMatchObject({
      _id: expect.any(String),
      publicId: '22',
    });
  });
  it('Should update a exists user', async () => {
    await upsertUser({
      publicId: '22',
      email: 'test2@test2.com',
      username: 'test',
      phone: '222-222-2222',
    });
    const upsertedUser = await getUserById('22');
    expect(upsertedUser).toMatchObject({
      _id: expect.any(String),
      publicId: '22',
      email: 'test2@test2.com',
      phone: '222-222-2222',
    });
  });
});
