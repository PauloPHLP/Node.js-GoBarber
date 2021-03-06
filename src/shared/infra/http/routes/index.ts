import { Router } from 'express';

import appointmentsRouter from '@modules/appointments/infra/http/routes/apointments.routes';
import providersRouter from '@modules/appointments/infra/http/routes/providers.routes';

import usersRouter from '@modules/users/infra/http/routes/users.routes';
import profileRouter from '@modules/users/infra/http/routes/profile.routes';
import passwordRouter from '@modules/users/infra/http/routes/password.routes';

import sessions from '@modules/users/infra/http/routes/sessions.routes';

const routes = Router();

routes.use('/appointments', appointmentsRouter);
routes.use('/providers', providersRouter);

routes.use('/users', usersRouter);
routes.use('/profile', profileRouter);
routes.use('/password', passwordRouter);

routes.use('/sessions', sessions);

export default routes;
