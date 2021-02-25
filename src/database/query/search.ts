import { execute } from './execute';

interface Options {
    table: string;
    select?: string[];
    join?: object[] | object;
    where?: object;
    sort?: Order;
}

interface Where {
    operator?: string;
}

interface Order {
    order: string[];
    asc: boolean;
}

/**
 * Search Function
 *
 * Returns all rows if no params have been passed
 * @param { object } options table | select | where | sort
 * @returns { array }
 */
const search = (options: Options): Promise<any[]> => {
    const { table, select, join, where, sort } = options;
    const tableSelects: string = select ? select.join(', ') : '*';
    return execute(
        'SELECT ' +
            tableSelects +
            ' FROM ' +
            table +
            joinQueryString(table, join) +
            whereQueryString(where) +
            sortQueryString(sort),
    );
};

/**
 * Join Function
 *
 * @param join
 * @returns { string }
 */
const joinQueryString = (table: string, join: any): string => {
    const joinQuery = (joinObject: any): string => {
        const joinData: any = { ...joinObject };
        delete joinData.table;
        delete joinData.type;
        const joinColumnInit: string = Object.keys(joinData)[0];
        const joinColumn: string | unknown = Object.values(joinData)[0];

        const joinType = (type: string) => {
            switch (typeof type === 'string' && type.toLowerCase()) {
                case 'left':
                    return ' LEFT JOIN ';
                case 'right':
                    return ' RIGHT JOIN ';
                default:
                    return ' INNER JOIN ';
            }
        };
        return (
            joinType(joinObject.type) +
            joinObject.table +
            ' ON ' +
            joinObject.table +
            '.' +
            joinColumnInit +
            ' = ' +
            table +
            '.' +
            joinColumn
        );
    };

    if (!join) return '';
    if (Array.isArray(join)) {
        return join.map((joinObject) => joinQuery(joinObject)).join(' ');
    }
    return joinQuery(join);
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

/**
 * Sort Function
 *
 * Sorts based and returns string on passed object
 * @param sort
 * @returns { string }
 */
const sortQueryString = (sort: Order | undefined): string => {
    if (sort?.order === undefined) return '';
    return (
        ' ORDER BY ' +
        sort.order.join(', ') +
        (sort.asc === true ? ' ASC' : ' DESC')
    );
};

export { search };
