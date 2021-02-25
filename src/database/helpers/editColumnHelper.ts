import { tableInfo } from '../query/tableInfo';
import { execute } from '../query/execute';

/**
 * EditColumn Function
 *
 * Renames table column, based on given objects keys and values
 * @param table
 * @param editItems
 */
const renameColumn = async (
    table: string,
    editItems: object[] = [],
): Promise<void> => {
    const tableData: object[] = await tableInfo(table);
    editItems.forEach((editItem: object) => {
        Object.keys(editItem).forEach((_, i: number) => {
            tableData.forEach(async (currentColumn: any, j) => {
                const key: string = Object.keys(editItem)[i];
                const value: string = Object.values(editItem)[i];
                if (
                    currentColumn.name === key &&
                    currentColumn.name !== value
                ) {
                    await execute(
                        'ALTER TABLE ' +
                            table +
                            ' RENAME ' +
                            key +
                            ' TO ' +
                            value,
                    );
                }
            });
        });
    });
};

export default renameColumn;
