import express from 'express';
import { login, register } from './auth.controller';

export const authRoute = express.Router();

authRoute.post('/register', register);
authRoute.post('/login', login);
