import express from 'express';
import loaders from './loaders';
import bodyParser from 'body-parser';


import { ProjectsController } from './controller/projects.controller';
import { UserController } from './controller/user.controller';
import { ToolboxItemController } from './controller/toolboxItem.controller';
import { ToolboxController } from './controller/toolbox.controller';
import { BioController } from './controller/bio.controller';
import { EducationController } from './controller/education.controller';
import { ExperienceController } from './controller/experience.controller';
import fileUpload from 'express-fileupload';
import { MailerController } from './controller/mailer.controller';

async function startServer() {
    const app = express();
    app.use((req: any, res: any, next: any) => {
      next();
  });
    app.use(bodyParser.urlencoded({extended: true}));
    app.use(bodyParser.json());

    await loaders(app);

    UserController(app);
    ProjectsController(app);
    ToolboxItemController(app);
    ToolboxController(app);
    BioController(app);
    EducationController(app);
    ExperienceController(app);
    MailerController(app);

    app.use(fileUpload());
    let port = process.env.PORT;
    if (port == null || port === '') {
    port = '3000';
}
    app.listen(port, () => console.log('Express server is running on port 3000'));
  }
startServer();
