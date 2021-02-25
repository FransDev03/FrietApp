import { execute } from './execute';

/**
 * DropTable Function
 *
 * Drops table if exists
 * @param { string } table
 */
const dropTable = (table: string): void => {
    execute('DROP TABLE IF EXISTS ' + table);
};

export { dropTable };
