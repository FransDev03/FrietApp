import { execute } from './execute';

/**
 * RenameTable Function
 *
 * Rename table to second parameter
 * @param { string } oldTable
 * @param { string } newTable
 */
const renameTable = (oldTable: string, newTable: string): void => {
    execute('ALTER TABLE ' + oldTable + ' RENAME TO ' + newTable);
};

export { renameTable };
