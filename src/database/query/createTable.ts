import { execute } from './execute';

/**
 * CreateTable Function
 *
 * Creates table if not exists
 * @param { string } table
 * @param { object } tableContent
 */
const createTable = (table: string, tableContent: object): void => {
    const queryStart: string = 'CREATE TABLE IF NOT EXISTS ' + table + ' (';
    const tableContentNames: string[] = Object.keys(tableContent);
    const tableContentConstaints: string[] = Object.values(tableContent);
    const queryColumnsArray: string[] = [];
    for (let i = 0; i < tableContentNames.length; i++) {
        queryColumnsArray.push(
            tableContentNames[i] + ' ' + tableContentConstaints[i],
        );
    }

    execute(queryStart + queryColumnsArray.join(', ') + ')');
};

export { createTable };
