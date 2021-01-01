import axios from 'axios';

import { STORE_URL } from '../constants';
import { InputModel } from '../interfaces';
import { dBProduct, Product } from '../models/product';

/**
 * Creates new product into our database.
 * @param {object} values - Insert values for new product.
 */
export const createProduct = (values: InputModel<Product>): Promise<Product> =>
  dBProduct.create(values);

/**
 * Upsert product into our database.
 * @param {object} values - Upsert values for product. Insert new product or update product if it already in database.
 */
export const upsertProduct = async (values: InputModel<Product>): Promise<Product | null> =>
  await dBProduct.findOneAndUpdate({ publicId: values.publicId }, values, { upsert: true });

/**
 * Returns list of existing products from E-Commerce Store.
 */
export const fetchProducts = async (): Promise<IProduct[]> => {
  const { data } = await axios.get(`${STORE_URL}/products`);
  return data;
};

/**
 * Returns all existing products from our database.
 */
export const getProducts = async (): Promise<Product[]> =>
  // eslint-disable-next-line unicorn/no-fn-reference-in-iterator
  await dBProduct.find();

/**
 * Returns all existing products from our database by filter. For example, filter by category is should be {category: name of category}.
 */
export const getProductsByFilter = async (filter: string): Promise<Product[]> => {
  if (filter !== '') {
    const filterCategory = JSON.parse(filter);
    // eslint-disable-next-line unicorn/no-fn-reference-in-iterator
    return await dBProduct.find({ category: filterCategory.category });
  }
  return await dBProduct.find();
};

/**
 * Returns product by Id from our database.
 */
export const getProductById = async (productId: string): Promise<Product | null> =>
  await dBProduct.findOne({ publicId: productId });

/**
 * Synchronizes products from the external store into our database.
 */
export const syncProducts = async (): Promise<boolean> => {
  const products = await fetchProducts();
  try {
    products.forEach((product) => {
      upsertProduct({
        publicId: product.id.toString(),
        title: product.title,
        price: product.price,
        description: product.description,
        category: product.category,
        image: product.image,
      });
    });
    return true;
  } catch {
    return false;
  }
};

export interface IProduct {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
}
