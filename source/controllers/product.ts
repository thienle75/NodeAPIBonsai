import { Request, Response } from 'express';
import httpStatus from 'http-status';

import * as productService from '../services/product';

export const getProducts = async (_req: Request, res: Response): Promise<void> => {
  const products = _req.query.filterQuery
    ? await productService.getProductsByFilter(_req.query.filterQuery.toString())
    : await productService.getProducts();
  res.status(httpStatus.OK).json(products);
};

export const getProductById = async (_req: Request, res: Response): Promise<void> => {
  const product = await productService.getProductById(_req.params.productId);
  res.status(httpStatus.OK).json(product);
};

export const syncProducts = (_req: Request, res: Response): void => {
  const success = productService.syncProducts();
  if (success) {
    res.sendStatus(httpStatus.OK);
  } else {
    res.sendStatus(httpStatus.NO_CONTENT);
  }
};
