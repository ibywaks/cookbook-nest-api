import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

import LocalCache from '../local-cache';

@Injectable()
export class CheckCacheMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    try {
      const { baseUrl, method } = req;
      const [, , , cacheKey] = baseUrl.split('/');

      if (method === 'GET' && LocalCache.hasKey(cacheKey)) {
        const data = LocalCache.get(cacheKey);

        return res.status(200).send(data);
      }
      next();
    } catch (err) {
      throw err;
    }
  }
}
