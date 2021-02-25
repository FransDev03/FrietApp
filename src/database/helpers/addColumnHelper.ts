import { execute } from '../query/execute';
import { tableInfo } from '../query/tableInfo';
import { dropTable } from '../query/dropTable';

interface AddItem {
    after?: string;
}

interface TableData {
    name: string;
    type: string;
    pk: number;
    dflt_value: null | number | string;
    notnull: number;
}

/**
 * AddColumn Method
 *
 * Adds columns based on entered objects in array argument
 * Optionally you can enter a column name as string with key after to insert new column after certain column
 * @param table
 * @param addItems
 */
const addColumn = async (
    table: string,
    addItems: AddItem[] = [],
): Promise<void> => {
    addItems.forEach(async (addItem: AddItem) => {
        if ('after' in addItem) {
            // Get all table info
            const tableData: TableData[] = await tableInfo(table);

            const sortAddItem: AddItem = { ...addItem };
            delete sortAddItem.after;
            if (
                tableData.some(
                    (tableObject) =>
                        tableObject.name === Object.keys(sortAddItem)[0],
                )
            ) {
                return console.warn(
                    'Column ' +
                        Object.keys(sortAddItem)[0] +
                        ' already exists in table ' +
                        table,
                );
            }
            // Rename table to temporary name
            await execute('ALTER TABLE ' + table + ' RENAME TO tmp_' + table);
            const tableCreateContent: string[] = [];
            const tableContentNames: string[] = [];
            // Add queryvalues for each column in info to create new table
            for (let i = 0; i < tableData.length; i++) {
                const nullValue: string = tableData[i].notnull
                    ? ' NOT NULL'
                    : ' NULL';
                const primaryKey: string = tableData[i].pk
                    ? ' PRIMARY KEY '
                    : '';
                const defaultValue: string =
                    tableData[i].dflt_value === null
                        ? ''
                        : ' DEFAULT ' + tableData[i].dflt_value;

                tableContentNames.push(tableData[i].name);
                // Push column values in array
                tableCreateContent.push(
                    tableData[i].name +
                        ' ' +
                        tableData[i].type +
                        primaryKey +
                        nullValue +
                        defaultValue,
                );

                if (tableData[i].name === addItem.after) {
                    delete addItem.after;

                    // Push column values in array
                    tableCreateContent.push(
                        Object.keys(addItem)[0] +
                            ' ' +
                            Object.values(addItem)[0],
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
            return await dropTable('tmp_' + table);
        }

        execute(
            'ALTER TABLE ' +
                table +
                ' ADD COLUMN ' +
                Object.keys(addItem)[0] +
                ' ' +
                Object.values(addItem)[0],
        );
    });
};

export default addColumn;
