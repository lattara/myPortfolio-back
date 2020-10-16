import { Project } from '../models/project';
import express, { Router, Request, Response, Application } from 'express';
import { ProjectsService } from '../services/projects.service';
import { UserService } from '../services/user.service';

export const ProjectsController = (app: Application) => {

  const router: Router = express.Router();
  const projectsService = ProjectsService.getInstance();
  const userService = UserService.getInstance();

  router.get('/', (req: Request, res: Response) => {
      projectsService.getAll().then(results => {
        res.send(results);
      })
        .catch(err => {
          res.send(err);
        });
    });

  router.get('/:id', (req: Request, res: Response) => {
    // tslint:disable-next-line: radix
    const id = parseInt(req.params.id);
    projectsService.getById(id).then(result => {
      res.send(result);
    })
      .catch(err => {
        // tslint:disable-next-line: no-console
        console.error(err);
      });
  });

  router.post('/', userService.verifyToken, (req: Request, res: Response) => {
    const project: Project = req.body; // Automatically transform in a project object

    projectsService.create(project).then(result => {
      res.send(result);
    })
      .catch(err => {
        console.error(err);
      });
  });
  
  router.delete('/:id', userService.verifyToken, (req: Request, res: Response) => {
    const id = parseInt(req.params.id);

    projectsService.delete(id).then(result => {
      res.send();
    })
      .catch(err => {
        console.log(err);
      });
  });

  app.use('/api/projects', router);
};
