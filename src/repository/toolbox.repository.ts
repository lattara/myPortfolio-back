import { ToolboxItem } from '../models/toolboxItem';
import { MysqlConnection } from '../loaders/mysql';

export class ToolboxRepository {

    private static instance: ToolboxRepository;
    private connection: MysqlConnection = MysqlConnection.getInstance();

    private table: string = 'toolbox';

    static getInstance() {
        if (!this.instance) {
            this.instance = new ToolboxRepository();
        }
        return this.instance;
    }

    private constructor() {
    }

    // Find Toolbox by projectId
    findByProjectsId(projectId: number): Promise<ToolboxItem> {
        return this.connection.query(`select distinct ti.id, ti.name, sortcut, master_level from projects p join toolbox t on p.id = t.projects_id join toolbox_item ti on ti.id = t.toolbox_item_id where t.projects_id=${projectId};`, [projectId])
            .then((results: any) => new ToolboxItem(results));
    }

    // remove ToolboxItem relative to project toolbox
    removeToolboxItemFromProjectToolbox(projectId: number, toolboxItemId: number): Promise<any> {
        return this.connection.query(`DELETE FROM ${this.table} where projects_id = ? AND toolbox_item_id = ?`, [projectId, toolboxItemId]);
    }

    findByProjectAndToolboxId(projectId: number, toolboxItemId: number): Promise<any> {
        return this.connection.query(`SELECT * FROM ${this.table} where projects_id = ? AND toolbox_item_id = ?`, [projectId, toolboxItemId]);
    }

    // insert into corresponding toolbox of the object new toolboxItem
    insertIntoProjectsToolbox(projectId: number, toolboxItemId: number) {
        return this.connection.query(
            `INSERT INTO ${this.table} (projects_id, toolbox_item_id) VALUES (?,?)`,
            [projectId, toolboxItemId],
        );
    }
}
