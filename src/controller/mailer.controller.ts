import express, { Router, Request, Response, Application, response } from 'express';
import {Mailer} from '../loaders/email';

export const MailerController = (app: Application) => {
  const router: Router = express.Router();
  const mailer = Mailer.getInstance();

  router.post('/send', (req: Request, res: Response) => {
    mailer.sendEmail(
        'Happy days! You have new message from your website Ana',
        `You have recieved message from ${req.body.name} e-mail: ${req.body.email} phone ${req.body.phone}) message: ${req.body.message}`,
        '',
        `${req.body.email}`),
        res.status(200);
    });

  app.use('/api/contact', router);
};
