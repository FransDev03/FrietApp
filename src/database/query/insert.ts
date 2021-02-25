import { execute } from './execute';

/**
 * Insert Function
 *
 * Inserts values in entered table
 * Multiple objects in array are allowed
 * @param { string } table
 * @param { object } filters
 * @param { object } options
 * @returns { array }
 */
const insert = (table: string, insert: object[]): void => {
    const columns: string = Object.keys(insert[0]).join(', ');
    const insertValues: string[] = insert.map(
        (insertValue) =>
            '(' +
            Object.values(insertValue)
                .map((insertItem: string | number | undefined | object) => {
                    switch (typeof insertItem) {
                        case 'string':
                            return '"' + insertItem + '"';
                        case 'object':
                            return 'null';
                        default:
                            return insertItem;
                    }
                })
                .join(', ') +
            ')',
    );

    execute(
        'INSERT INTO ' + table + ' (' + columns + ') VALUES ' + insertValues,
    );
};

export { insert };
