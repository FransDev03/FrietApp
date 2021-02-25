import { execute } from '../query/execute';
import { tableInfo } from '../query/tableInfo';
import { dropTable } from '../query/dropTable';

interface TableData {
    name: string;
    type: string;
    pk: number;
    dflt_value: null | number | string;
    notnull: number;
}

/**
 * DeleteColumn Method
 *
 * Deletes all columns in entered array
 * @param table
 * @param deleteItems
 */
const deleteColumn = async (
    table: string,
    deleteItems: string[] = [],
): Promise<void> => {
    for (let i = 0; i < deleteItems?.length; i++) {
        // Get all table info
        const tableData: TableData[] = await tableInfo(table);
        // Rename table to temporary name
        await execute('ALTER TABLE ' + table + ' RENAME TO tmp_' + table);
        const tableCreateContent: string[] = [];
        const tableContentNames: string[] = [];
        // Add queryvalues for each column in info to create new table
        for (let j = 0; j < tableData.length; j++) {
            const nullValue: string = tableData[j].notnull
                ? ' NOT NULL'
                : ' NULL';
            const primaryKey: string = tableData[j].pk ? ' PRIMARY KEY ' : '';
            const defaultValue: string =
                tableData[j].dflt_value === null
                    ? ''
                    : ' DEFAULT ' + tableData[j].dflt_value;
            if (tableData[j].name !== deleteItems[i]) {
                tableContentNames.push(tableData[j].name);
                // Push column values in array
                tableCreateContent.push(
                    tableData[j].name +
                        ' ' +
                        tableData[j].type +
                        primaryKey +
                        nullValue +
                        defaultValue,
                );
            }
        }
        // Create correct table
        await execute(
            'CREATE TABLE ' +
                table +
                ' (' +
                tableCreateContent.join(', ') +
                ')',
        );
        // Copy data from temporary created table
        await execute(
            'INSERT INTO ' +
                table +
                '(' +
                tableContentNames.join(', ') +
                ') SELECT ' +
                tableContentNames.join(', ') +
                ' FROM tmp_' +
                table,
        );
        // Drop the temporary created table
        await dropTable('tmp_' + table);
    }
};

export default deleteColumn;
