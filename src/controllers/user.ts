import { Request, Response, NextFunction } from 'express';
import { User, UserDocument, AuthToken } from '../models/User';
import Bcrypt from 'bcryptjs';
import createToken from '../utils/createToken';

export const postLogin = (request: Request, response: Response) => {
    const { username, password } = request.body;
    User.findOne({ username: username }, (error, user) => {
        if (user) {
            if (Bcrypt.compareSync(password, user.password)) {
                response.status(200).send(createToken(username));
            }
        } else {
            response.sendStatus(401);
        }
    });
};

export const postSignup = (
    request: Request,
    response: Response,
    next: NextFunction
) => {
    const { username, password } = request.body;

    const user = new User({
        username: username,
        password: password,
    });
    user.save((error) => {
        if (error) {
            return next(error);
        }
        response.status(200).send(createToken(user.username));
    });
};

export const getOwnUser = (request: Request, response: Response) => {
    if (request.decoded && request.decoded.username) {
        User.findOne({ username: request.decoded.username }, (error, user) =>
            user ? response.status(200).json(user) : response.sendStatus(404)
        );
    } else {
        response.sendStatus(401);
    }
};
