import { Experience } from '../models/experience';
import express, { Router, Request, Response, Application } from 'express';
import { ExperienceService } from '../services/experience.service';
import { UserService } from '../services/user.service';

export const ExperienceController = (app: Application) => {

    const router: Router = express.Router();
    const experienceService = ExperienceService.getInstance();
    const userService = UserService.getInstance();

    router.get('/', (req: Request, res: Response) => {
        experienceService.getAll().then(results => {
            res.send(results);
        })
            .catch(err => {
                console.log(err);
            });
    });

    router.get('/:id', (req: Request, res: Response) => {
        // tslint:disable-next-line: radix
        const id = parseInt(req.params.id);
        experienceService.getById(id).then(result => {
            res.send(result);
        })
            .catch(err => {
                // tslint:disable-next-line: no-console
                console.error(err);
            });
    });

    router.post('/', userService.verifyToken, (req: Request, res: Response) => {
        const experience: Experience = req.body; // Automatically transform in a project object
        experienceService.create(experience).then(result => {
            res.send(result);
        })
            .catch(err => {
                console.error(err);
            });
    });

    router.put('/:id', userService.verifyToken, (req: Request, res: Response) => {
        const experience: Experience = req.body; // req.params.id is automatically set into the body
        experienceService.update(experience).then(result => {
            res.send(result);
        })
            .catch(err => {
                console.error(err);
            });
    });

    router.delete('/:id', userService.verifyToken, (req: Request, res: Response) => {
        const id = parseInt(req.params.id);
        experienceService.delete(id).then(result => {
            res.send();
        })
            .catch(err => {
                console.log(err);
            });
    });

    app.use('/api/experience', router);
};
