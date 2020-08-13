import { Router } from 'express';
import appointmentsRouter from '@modules/appointments/infra/http/routes/apointments.routes';
import usersRouter from '@modules/users/infra/http/routes/users.routes';
import passwordRouter from '@modules/users/infra/http/routes/password.routes';
import sessions from '@modules/users/infra/http/routes/sessions.routes';

const routes = Router();

routes.use('/appointments', appointmentsRouter);
routes.use('/users', usersRouter);
routes.use('/password', passwordRouter);
routes.use('/sessions', sessions);

export default routes;
