import { ToolboxItemRepository } from '../repository/toolboxItem.repository';
import { ToolboxItem } from 'src/models/toolboxItem';

export class ToolboxItemService {

private static instance: ToolboxItemService;
static getInstance() {
    if (!this.instance) {
    this.instance = new ToolboxItemService();
    }
    return this.instance;
}

private repository: ToolboxItemRepository;
private constructor() {
    this.repository = ToolboxItemRepository.getInstance();
}

getAll(): Promise<ToolboxItem[]> {
    return this.repository.findAll();
}

getById(id: number): Promise<ToolboxItem> {
    return this.repository.findById(id);
}

create(toolboxItem: any): Promise<ToolboxItem> {
    return this.repository.insert(toolboxItem);
}

update(toolboxItem: any): Promise<ToolboxItem> {
    return this.repository.update(toolboxItem);
}

delete(id: number): Promise<any> {
    return this.repository.delete(id);
}
}
