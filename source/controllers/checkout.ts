import { Request, Response } from 'express';
import httpStatus from 'http-status';

import * as checkoutService from '../services/checkout';

export const checkout = async (req: Request, res: Response): Promise<void> => {
  const checkout = await checkoutService.checkout(req.body);
  if (checkout) {
    res.status(httpStatus.OK).json(checkout);
  } else {
    res.status(httpStatus.NOT_ACCEPTABLE);
  }
};
