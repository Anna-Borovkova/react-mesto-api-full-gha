const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const { errors } = require('celebrate');
const usersRouter = require('./users');
const cardsRouter = require('./cards');
const NotFoundError = require('../errors/not-found-error');
const regExp = require('../utils/constants');
const {
  createUser,
  login,
} = require('../controllers/users');
const auth = require('../middlewares/auth');
const { requestLogger, errorLogger } = require('../middlewares/logger');

router.use(requestLogger); // подключаем логгер запросов

router.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error('Сервер сейчас упадёт');
  }, 0);
});

router.post('/signin', celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required().min(2),
  }),
}), login);

router.post('/signup', celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
    email: Joi.string().required().email(),
    password: Joi.string().required().min(2),
    avatar: Joi.string()
      .regex(regExp),
  }),
}), createUser);

router.get('/signout', (req, res) => {
  res.clearCookie('jwt').send({ message: 'Выход' });
});

router.use(auth);

router.use(usersRouter);
router.use(cardsRouter);

router.use('*', (req, res, next) => {
  next(new NotFoundError('Route not found'));
});

router.use(errorLogger); // подключаем логгер ошибок

router.use(errors());

module.exports = router;
