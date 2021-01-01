import { Application } from 'express';

import { authentication } from '../authentication';
import { checkout } from '../controllers/checkout';
import { getProducts, syncProducts, getProductById } from '../controllers/product';
import { syncEvenUsers } from '../controllers/user';

export const setupRoutes = (app: Application): void => {
  app
    .post('/checkout', authentication, checkout)
    .get('/products', authentication, getProducts)
    .get('/product/:productId', authentication, getProductById)
    .post('/products/sync', authentication, syncProducts)
    .post('/users/sync', authentication, syncEvenUsers);
};
