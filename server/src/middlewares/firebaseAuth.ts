import express from 'express';
import admin from '../config/firebase';

const authMiddleware = (
  request: express.Request,
  response: express.Response
// eslint-disable-next-line consistent-return
) => {
  const headerToken = request.headers.authorization;
  if (!headerToken) {
    return response.send({ message: 'No token provided' }).status(401);
  }

  if (headerToken && headerToken.split(' ')[0] !== 'Bearer') {
    response.send({ message: 'Invalid token' }).status(401);
  }

  const token = headerToken.split(' ')[1];
  admin
    .auth()
    .verifyIdToken(token)
    .then(decodedIdToken => admin.auth().getUser(decodedIdToken.uid)).then(user => {
      // Do whatever you want with the user.
      // eslint-disable-next-line no-console
      console.log(user);
    })
    .catch(() => response.send({ message: 'Could not authorize' }).status(403));
};

export default authMiddleware;
