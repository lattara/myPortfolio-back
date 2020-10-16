import { Bio } from '../models/bio';
import express, { Router, Request, Response, Application } from 'express';
import { BioService } from '../services/bio.service';
import { UserService } from '../services/user.service';

export const BioController = (app: Application) => {

    const router: Router = express.Router();
    const bioService = BioService.getInstance();
    const userService = UserService.getInstance();

    router.get('/', (req: Request, res: Response) => {
        bioService.getBio().then(results => {
            res.send(results);
        })
            .catch(err => {
                console.log(err);
            });
    });

    router.put('/', userService.verifyToken, (req: Request, res: Response) => {
        const bio: Bio = req.body; // req.params.id is automatically set into the body

        bioService.update(bio).then(result => {
            res.send(result);
        })
            .catch(err => {
                console.error(err);
            });
    });

    router.post('/upload', async (req, res, next) => {
        try {
            if (!req.files) {
                res.send({
                    status: false,
                    message: 'No file uploaded',
                });
            } else {
                const files: any = req.files;
                const cvObject = files.uploadedFiles[0];
                const id = bioService.getRandomInt(1000);
                cvObject.mv('./uploads/' + id + cvObject.name);
                const imageObject = files.uploadedFiles[1];
                const idImage = bioService.getRandomInt(1000);
                imageObject.mv('./uploads/' + idImage + imageObject.name);
                res.send({
                    status: true,
                    message: 'File is uploaded',
                    data: {
                        CVname: id + cvObject.name,
                        CVmimetype: cvObject.mimetype,
                        CVsize: cvObject.size,
                        imgName: idImage + imageObject.name,
                        imgMimetype: imageObject.mimetype,
                        imgSize: imageObject.size,
                    },
                });
            }
        } catch (err) {
            res.status(500).send(err);
        }
    });

    app.use('/api/bio', router);
};
