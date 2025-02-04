import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

interface JwtPayload {
  username: string;
}

export const authenticateToken = (req: Request, res: Response, next: NextFunction) => {
  // TODO:done verify the token exists and add the user data to the request object
  const authHeader = req.headers.authorization; // Get the token from the FE

  if (authHeader) {
    const token = authHeader.split(' ')[1];

    const secretKey = process.env.JWT_SECRET_KEY || '';

    jwt.verify(token, secretKey, (err, user) => {
      if (err) {
        return res.sendStatus(403) // Forbiddden AKA they passed a bad token
      }

      req.user = user as JwtPayload;

      return next(); // Do the next thing
    });
  } else {
    res.sendStatus(401); // Unauth
  }
};

// 200 good, 400 user end error, 500 something wrong with your code/server
