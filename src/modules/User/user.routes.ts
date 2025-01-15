import express from 'express';

import {
  createNewUser,
  getUsers,
  getSingleUser,
  updateSingleUser,
  deleteSingleUser,
} from './user.controller';

export const userRoute = express.Router();

// userRoute.route("/").post(middleware1,middleware2,middleware3,).get(getUsers);

userRoute.route('/').post(createNewUser).get(getUsers);
userRoute
  .route('/:id')
  .get(getSingleUser)
  .patch(updateSingleUser)
  .delete(deleteSingleUser);
