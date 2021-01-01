import axios from 'axios';

import { STORE_URL } from '../constants';
import { getProductById } from './product';

/**
 * Verify all product exists in local database.
 *
 */
const isProduct = async (product: IProductCart): Promise<boolean> =>
  !!(await getProductById(product.productId.toString()));

/**
 * Creates a new cart used for checkout.
 * @param {object} values - Cart values.
 */
export const checkout = async (values: ICreateCart): Promise<ICart | null> => {
  const check = values.products.every((product) => isProduct(product));
  if (check) {
    const { data } = await axios.post(`${STORE_URL}/carts`, values);
    return data;
  }
  return null;
};

export interface ICreateCart {
  userId: number;
  date: Date;
  products: {
    productId: number;
    quantity: number;
  }[];
}

export interface IProductCart {
  productId: number;
  quantity: number;
}
export interface ICart extends ICreateCart {
  id: number;
}
