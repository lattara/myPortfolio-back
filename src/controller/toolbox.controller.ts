import { ToolboxService } from '../services/toolbox.service';
import express, { Router, Request, Response, Application } from 'express';
import { UserService } from '../services/user.service';

export const ToolboxController = (app: Application) => {

    const router: Router = express.Router();
    const toolboxService = ToolboxService.getInstance();
    const userService = UserService.getInstance();

    // get all toolboxItems by project id
    router.get('/:projectId', (req: Request, res: Response) => {
        const projectId = parseInt(req.params.projectId);
        toolboxService.findById(projectId).then(result => {
            res.send(result);
        })
            .catch(err => {
                console.error(err);
            });
    });

    // get toolbox item relative to projectId and toolboxItemId
    router.get('/:projectId&:toolboxItemId', (req: Request, res: Response) => {
        const projectId = parseInt(req.params.projectId);
        const toolboxItemId = parseInt(req.params.toolboxItemId);
        toolboxService.findByProjectAndToolboxId(projectId, toolboxItemId).then(result => {
            res.send(result);
        })
            .catch(err => {
                console.error(err);
            });
    });

    // post toolboxItem into toolbox of the project
    router.post('/', userService.verifyToken, (req: Request, res: Response) => {
        const data: number[] = req.body;
        const projectIdAndToolboxIdArr = Object.values(data);
        const projectId = projectIdAndToolboxIdArr[0];
        const toolboxId = projectIdAndToolboxIdArr[1];
        toolboxService.create(projectId, toolboxId).then(result => {
            res.send();
        })
            .catch(err => {
                console.error(err);
            });
    });

    router.delete('/:projectId&:toolboxItemId', userService.verifyToken, (req: Request, res: Response) => {
        const projectId = parseInt(req.params.projectId);
        const toolboxItemId = parseInt(req.params.toolboxItemId);
        toolboxService.removeFromToolbox(projectId, toolboxItemId).then(result => {
            res.send();
        })
            .catch(err => {
                console.error(err);
            });
    });

    app.use('/api/toolbox', router);
};
