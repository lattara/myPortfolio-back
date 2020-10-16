import express, { Router, Request, Response, Application } from 'express';
import { UserService } from '../services/user.service';
import { User } from 'src/models/user';
import * as jwt from 'jsonwebtoken';
import { resolve } from 'dns';

export const UserController = (app: Application) => {

    const router: Router = express.Router();
    const userService = UserService.getInstance();
    const secret: string  = process.env.SECRET!;

    router.post('/register', async (req, res) => {
        const userData: User = req.body;
        userService.register(userData).then(result => {
            // token generation
            const payload = {subject: userData.id};
            const token = jwt.sign(payload, secret);
            // send token as an object
            res.status(200).send({token});
        }).catch(err => {
            res.status(300).send('Credentials are already in database, please choose another email and/or identifiant');
        });
    });

    router.post('/login', async (req, res) => {
        const userData: User = req.body;
        userService.login(userData).then(result => {
            // token generation
            const payload = {subject: userData.id};
            const token = jwt.sign(payload, secret);
            // send token as an object
            res.status(200).send({token});
        }).catch(err => {
            res.status(300).send('Wrong email and/or password');
        });
    });

    router.post ('/currentUser', async (req, res) => {
        const userData: User = req.body;
        userService.getCurrentUser(userData).then( result => {
            res.send(result);
        });
    });

    app.use('/api/auth', router);
};
