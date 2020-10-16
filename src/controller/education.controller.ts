import { EducationService } from '../services/education.service';
import express, { Router, Request, Response, Application } from 'express';
import { Education } from 'src/models/education';
import { UserService } from '../services/user.service';

export const EducationController = (app: Application) => {

    const router: Router = express.Router();
    const educationService = EducationService.getInstance();
    const userService = UserService.getInstance();

    // get all education
    router.get('/', (req: Request, res: Response) => {
        educationService.getAll().then(results => {
            res.send(results);
        })
            .catch(err => {
                console.log(err);
            });
    });

    // get specific education by it's id
    router.get('/:id', (req: Request, res: Response) => {
        // tslint:disable-next-line: radix
        const id = parseInt(req.params.id);
        educationService.findById(id).then(result => {
            res.send(result);
        })
            .catch(err => {
                console.error(err);
            });
    });

    // post an education
    router.post('/', userService.verifyToken, (req: Request, res: Response) => {
        const education: Education = req.body; // Automatically transform in a edu object
        educationService.create(education).then(result => {
            res.send(result);
        })
            .catch(err => {
                console.error(err);
            });
    });

    // put an education
    router.put('/:id', (req: Request, res: Response) => {
        const education: Education = req.body; // req.params.id is automatically set into the body
        educationService.update(education).then(result => {
            res.send(result);
        })
            .catch(err => {
                console.error(err);
            });
    });

    router.delete('/:id', (req: Request, res: Response) => {
        const id = parseInt(req.params.id);
        educationService.delete(id).then(result => {
            res.send();
        })
            .catch(err => {
                console.log(err);
            });
    });

    app.use('/api/education', router);
};
