import { execute } from './execute';

/**
 * TableInfo Function
 *
 * Get all data from table as argument
 * @param { string }
 * @returns { array } columnInfo
 */
const tableInfo = (table: string): Promise<any[]> => {
    return execute('PRAGMA table_info(' + table + ')');
};

export { tableInfo };
