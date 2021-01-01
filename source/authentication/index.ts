import { Request, Response, NextFunction } from 'express';
import httpStatus from 'http-status';

export const authentication = (_req: Request, res: Response, next: NextFunction): void => {
  // eslint-disable-next-line prefer-destructuring
  const authHeader = _req.headers.bonsaideveloper;
  if (authHeader) {
    if (authHeader !== 'thienle') {
      res.status(httpStatus.NON_AUTHORITATIVE_INFORMATION);
    }
    next();
  } else {
    res.status(httpStatus.BAD_REQUEST);
  }
};
