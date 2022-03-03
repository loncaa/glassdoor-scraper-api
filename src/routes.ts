import * as express from 'express';

import * as ParserRoutes from './components/scraper/scraper.routes';
import * as UserProfileRoutes from './components/userProfile/userProfile.routes';

const router = express.Router();

router.use(`/${ParserRoutes.mapping}`, ParserRoutes.router);
router.use(`/${UserProfileRoutes.mapping}`, UserProfileRoutes.router);

router.get(`/health`, (req, res) =>
  res.status(200).json({ ok: true, timestamp: new Date().getTime() })
);

export { router };
