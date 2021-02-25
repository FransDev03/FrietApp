import { execute } from './execute';

interface Where {
    operator?: string;
}

/**
 * Update Function
 *
 * Inserts values in entered table
 * Multiple objects in array are allowed
 * @param { string } table
 * @param { object } filters
 * @param { object } options
 * @returns { array }
 */
const update = (table: string, update: object, filters: object): void => {
    const updateColumns: string[] = Object.keys(update);
    const updateValues: string[] = Object.values(update).map((updateValue) => {
        switch (typeof updateValue) {
            case 'string':
                return '"' + updateValue + '"';
            case 'object':
                return 'null';
            default:
                return updateValue;
        }
    });
    execute(
        'UPDATE ' +
            table +
            ' SET ' +
            updateQuery(updateColumns, updateValues) +
            whereQueryString(filters),
    );
};

/**
 * UpdateQuery Function
 *
 * Returns a string for SQLite query
 * @param updateColumns
 * @param updateValues
 */
const updateQuery = (updateColumns: string[], updateValues: any[]): string => {
    return updateColumns
        .map((_, i: number) => updateColumns[i] + ' = ' + updateValues[i])
        .join(', ');
};

/**
 * Where Function
 *
 * @param filters
 * @returns { string }
 */
const whereQueryString = (filters: undefined | Where): string => {
    if (!filters) return '';
    let operator: string = ' AND ';
    if ('operator' in filters) {
        operator = ' OR ';
        delete filters.operator;
    }
    const filtersKeys: Array<string> = Object.keys(filters);
    const filtersValues: Array<any> = Object.values(filters);
    const queryFiltersArray: Array<string> = [];
    for (let i = 0; i < filtersKeys.length; i++) {
        // Takes string or undefined value as argument then returns correct symbol
        const symbol = (symbol: string | undefined) => {
            if (symbol === undefined) return ' = ';
            return ' ' + symbol + ' ';
        };
        // Filters value for SQLite query depending on datatype
        const filterValue = (val: number | undefined | null | string) => {
            switch (typeof val) {
                case 'string':
                    return '"' + val + '"';
                case 'object':
                    return 'null';
                default:
                    return val;
            }
        };
        queryFiltersArray.push(
            filtersKeys[i] +
                symbol(
                    typeof filtersValues[i] === 'object'
                        ? filtersValues[i][1]
                        : '=',
                ) +
                filterValue(
                    typeof filtersValues[i] === 'object'
                        ? filtersValues[i][0]
                        : filtersValues[i],
                ),
        );
    }
    return ' WHERE ' + queryFiltersArray.join(operator);
};

export { update };
