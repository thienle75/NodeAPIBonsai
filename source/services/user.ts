import axios from 'axios';

import { STORE_URL } from '../constants';
import { InputModel } from '../interfaces';
import { dbUser, User } from '../models/user';
/**
 * Returns existing user by its id from E-Commerce Store.
 */
export const fetchUserById = async (id: string): Promise<IUser> => {
  const { data } = await axios.get(`${STORE_URL}/users/${id}`);
  return data;
};
/**
 * Returns user by public Id from our database.
 */
export const getUserById = async (userId: string): Promise<User | null> =>
  await dbUser.findOne({ publicId: userId });

/**
 * Upsert user into our database.
 * @param {object} values - Upsert values for user. Insert new user or update user if it already in database.
 */
export const upsertUser = async (values: InputModel<User>): Promise<User | null> =>
  await dbUser.findOneAndUpdate({ publicId: values.publicId }, values, { upsert: true });

/**
 * Synchronizes all user with an even id.
 * @todo Implement the actual functionality.
 */
export const syncEvenUsers = (): void =>
  // eslint-disable-next-line @typescript-eslint/no-magic-numbers
  [2, 4, 6, 8].forEach(async (userId) => {
    const data = await fetchUserById(userId.toString());
    upsertUser({
      publicId: data.id.toString(),
      email: data.email,
      username: data.username,
      phone: data.phone,
    });
  });

export interface IUser {
  id: number;
  email: string;
  username: string;
  phone?: string;
}
