import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';

import SessionsController from '../controllers/SessionsController';

const sessions = Router();
const sessionsController = new SessionsController();

sessions.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      email: Joi.string().email().required(),
      password: Joi.string().required(),
    },
  }),
  sessionsController.create,
);

export default sessions;
