import { Router, Request, Response } from 'express';
import { User } from '../models/user.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

export const login = async (req: Request, res: Response) => {
  // TODO:done If the user exists and the password is correct, return a JWT token

  const { username, password } = req.body; // 'Test12'

  const user = await User.findOne({
    where: { username }, // Matching usernames
  });

  if (!user) {
    return res.sendStatus(401).json({ message: 'unauthorizated'});
  }

  const passwordValid = await bcrypt.compare(password, user.password);

  if(!passwordValid) {
    return res.sendStatus(401).json({ message: 'unauthorizated'});
  }

  const secretKey = process.env.JWT_SECRET_KEY || '';
  // const payload = { id, username, email}
  const token = jwt.sign({ username }, secretKey, { expiresIn: '2h'});
  return res.json({ token });
};

const router = Router();

// POST /login - Login a user
router.post('/login', login);
// localhost:3001/auth/login

export default router;
