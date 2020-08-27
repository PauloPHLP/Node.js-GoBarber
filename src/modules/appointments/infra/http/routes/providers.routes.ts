import { Router } from 'express';

import ensureAuthenticated from '@modules/users/infra/middlewares/ensureAuthenticated';

import ProvidersController from '../controllers/ProvidersController';
import ProviderMonthAvailabiltyController from '../controllers/ProviderMonthAvailabiltyController';
import ProviderDayAvailabiltyController from '../controllers/ProviderDayAvailabiltyController';

const providersRouter = Router();
const providersController = new ProvidersController();
const providerMonthAvailabiltyController = new ProviderMonthAvailabiltyController();
const providerDayAvailabiltyController = new ProviderDayAvailabiltyController();

providersRouter.use(ensureAuthenticated);

providersRouter.get('/', providersController.index);
providersRouter.get(
  '/:provider_id/month-availability',
  providerMonthAvailabiltyController.index,
);
providersRouter.get(
  '/:provider_id/day-availability',
  providerDayAvailabiltyController.index,
);

export default providersRouter;
