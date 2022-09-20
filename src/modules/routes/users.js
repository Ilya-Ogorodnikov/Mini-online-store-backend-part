const Router = require('express');
const usersRouter = new Router();
const UserController  = require('../../controllers/users');
const validation = require('../../middlewares/validation');
const { userSchema, emailSchema, passwordSchema } = require('../../helpers/validation-schemas');

usersRouter.post('/signup', 
  validation(userSchema), 
  UserController.signUp
);
usersRouter.post('/login', UserController.logIn);
usersRouter.post('/sendResetPasswordMail', 
  validation(emailSchema),
  UserController.resetPasswordMail
);
usersRouter.post('/validateUser', UserController.validateUser);
usersRouter.patch('/changePassword', 
  validation(passwordSchema),
  UserController.changePassword
);
usersRouter.get('/refresh', UserController.refresh);

module.exports = usersRouter;