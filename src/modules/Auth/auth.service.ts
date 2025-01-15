import { User } from '../User/user.model';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { config } from '../../config/config';

export class AuthService {
  constructor() {}

  async login(email: string, password: string) {
    try {
      const user = await this.checkUserExistence(email);

      if (!user) {
        throw new Error('Wrong Crecentials');
      }

      const isPasswordValid = await this.isPasswordValid(
        password,
        user.password
      );

      if (!isPasswordValid) {
        throw new Error('Wrong Crecentials');
      }

      const token = jwt.sign({ userId: user._id }, config.jwtSecret);

      const sanitizedUser = {
        _id: user._id,
        name: user.name,
        email: user.email,
      };

      return { message: 'Login successful', token, user: sanitizedUser };
    } catch (error) {
      throw error;
    }
  }

  async register(name: string, email: string, password: string) {
    try {
      const existingUser = await this.checkUserExistence(email);
      if (!!existingUser) {
        throw new Error('User already exists');
      }

      const hashedPassword = await this.hashPassword(password);

      const newUser = new User({ name, email, password: hashedPassword });
      await newUser.save();

      return { message: 'User registered successfully', user: newUser };
    } catch (error) {
      throw error;
    }
  }

  private async checkUserExistence(email: string) {
    const existingUser = await User.findOne({ email });

    return existingUser;
  }

  private async isPasswordValid(password: string, hashedPassword: string) {
    const isPasswordValid = await bcrypt.compare(password, hashedPassword);

    return isPasswordValid;
  }

  private async hashPassword(password: string) {
    const saltRounds = 10;
    const hash = await bcrypt.hash(password, saltRounds);
    return hash;
  }
}
