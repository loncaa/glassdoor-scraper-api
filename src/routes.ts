import * as express from 'express';

import * as parserRoutes from './components/scraper/scraper.routes';

const router = express.Router();

router.use(`/${parserRoutes.mapping}`, parserRoutes.router);

router.get(`/health`, (req, res) =>
  res.status(200).json({ ok: true, timestamp: new Date().getTime() })
);

export { router };
