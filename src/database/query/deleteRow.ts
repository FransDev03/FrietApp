import { execute } from './execute';

/**
 * Delete Method
 * @param table table to be modified
 * @param filters
 */
const deleteRow = (table: string, filters: object = {}): void => {
    const query: string = 'DELETE FROM ' + table;
    const filtersKeys: Array<boolean | number | string> = Object.keys(filters);
    const filtersValues: Array<boolean | number | string> = Object.values(
        filters,
    );
    const queryfiltersArray: Array<boolean | number | string> = [];
    const queryStatementArray: Array<boolean | number | string> = [];
    for (let i = 0; i < filtersKeys.length; i++) {
        queryfiltersArray.push(filtersKeys[i] + ' = ?');
        queryStatementArray.push(filtersValues[i]);
    }
    let queryfilters: string = '';
    if (filtersKeys.length > 0) {
        queryfilters = ' WHERE ' + queryfiltersArray.join(' AND ');
    }

    execute(query + queryfilters, queryStatementArray);
};

export { deleteRow };
