import openDatabase from './openDatabase';

interface SQLiteOutput {
    insertId: any;
    rows: SQLiteResult;
    rowsAffected: number;
}

interface SQLiteResult {
    item: () => void;
    length: number;
    raw: () => void;
}

/**
 * Execute Function
 *
 * Executes any query, compatible with prepared statements
 * @param { string } query
 * @param { array } params
 * @param { string } databaseName
 * @returns { array } rows
 */
const execute = (
    sql: string,
    params: any[] = [],
    databaseName: string = 'local_frietapp',
): Promise<Object[]> => {
    const db: any = openDatabase(databaseName);
    return new Promise((resolve: any, reject: any) => {
        db.transaction((trans: any) => {
            trans.executeSql(
                sql,
                params,
                (trans: {}, results: SQLiteOutput) => {
                    resolve(results.rows.raw());
                },
                (error: any) => {
                    reject(error);
                },
            );
        });
    });
};

export { execute };
