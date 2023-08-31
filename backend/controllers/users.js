const httpConstants = require('http2').constants;
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const UnauthorizedError = require('../errors/unauthorized-error');
const NotFoundError = require('../errors/not-found-error');
const BadRequestError = require('../errors/bad-request-error');
const ConflictError = require('../errors/conflict-error');

const SALT_ROUNDS = 10;
const { JWT_SECRET = 'SECRET_KEY' } = process.env;

const getUsers = (req, res, next) => {
  User.find()
    .then((users) => {
      res.send(users);
    })
    .catch((err) => next(err));
};

const getUserById = (req, res, next) => {
  const { userId } = req.params;
  User.findById(userId)
    .orFail(() => new NotFoundError('User not found'))
    .then((user) => {
      res.send(user);
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        return next(new BadRequestError('Cast error'));
      }
      return next(err);
    });
};

const createUser = (req, res, next) => {
  const {
    name, about, avatar, email, password,
  } = req.body;
  bcrypt
    .hash(password, SALT_ROUNDS)
    .then((hash) => User.create({
      name,
      about,
      avatar,
      email,
      password: hash,
    }))
    .then((user) => {
      const userResponse = user.toObject();
      delete userResponse.password;
      res.status(httpConstants.HTTP_STATUS_CREATED).send(userResponse);
    })
    .catch((err) => {
      if (err.name === 'MongoServerError' && err.code === 11000) {
        return next(new ConflictError('Email already exists'));
      }
      if (err.name === 'ValidationError') {
        return next(new BadRequestError('Input data uncorrect'));
      }
      return next(err);
    });
};

const updateUserProfile = (req, res, next) => {
  const { name, about } = req.body;
  User.findByIdAndUpdate(
    req.user._id,
    { name, about },
    { new: true, runValidators: true },
  )
    .orFail(() => new NotFoundError('User not found'))
    .then((user) => {
      res.send(user);
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        return next(new BadRequestError('Input data incorrect'));
      }
      return next(err);
    });
};

const updateUserAvatar = (req, res, next) => {
  User.findByIdAndUpdate(
    req.user._id,
    { avatar: req.body.avatar },
    { new: true, runValidators: true },
  )
    .orFail(() => new NotFoundError('User not found'))
    .then((user) => {
      res.send(user);
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        return next(new BadRequestError('Input data incorrect'));
      }
      return next(err);
    });
};

const login = (req, res, next) => {
  const { email, password } = req.body;
  User.findOne({ email }).select('+password')
    .orFail(() => new UnauthorizedError('User not found'))
    .then((user) => {
      bcrypt.compare(password, user.password, (err, isValidPassword) => {
        if (!isValidPassword) {
          return next(new UnauthorizedError('Password is incorrect'));
        }
        const token = jwt.sign({ _id: user._id }, JWT_SECRET, { expiresIn: '7d' });
        return res.cookie('jwt', token, {
          maxAge: 3600000,
          httpOnly: true,
        }).send({ message: 'Success' })
          .end();
      });
    })
    .catch((err) => {
      next(err);
    });
};

const getCurrentUserById = (req, res, next) => {
  User.findById(req.user._id)
    .orFail(() => new NotFoundError('User not found'))
    .then((user) => {
      res.send(user);
    })
    .catch((err) => {
      next(err);
    });
};

module.exports = {
  getUsers,
  getUserById,
  createUser,
  updateUserProfile,
  updateUserAvatar,
  login,
  getCurrentUserById,
};
