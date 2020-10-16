import { ToolboxRepository } from '../repository/toolbox.repository';
import { ToolboxItem } from 'src/models/toolboxItem';

export class ToolboxService {

    private static instance: ToolboxService;
    static getInstance() {
        if (!this.instance) {
            this.instance = new ToolboxService();
        }
        return this.instance;
    }

    private repository: ToolboxRepository;
    private constructor() {
        this.repository = ToolboxRepository.getInstance();
    }

    findById(id: number): Promise<ToolboxItem> {
        return this.repository.findByProjectsId(id);
    }

    findByProjectAndToolboxId(projectId: number, toolboxItemId: number): Promise<any> {
        return this.repository.findByProjectAndToolboxId(projectId, toolboxItemId);
    }

    removeFromToolbox(projectId: number, toolboxItemId: number): Promise<any> {
        return this.repository.removeToolboxItemFromProjectToolbox(projectId, toolboxItemId);
    }

    create(projectId: number, ToolboxItemId: number): Promise<any> {
        return this.repository.insertIntoProjectsToolbox(projectId, ToolboxItemId);
    }

}
