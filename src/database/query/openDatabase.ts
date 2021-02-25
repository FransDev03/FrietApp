import SQLite from 'react-native-sqlite-storage';

/**
 * OpenDatabase Function
 *
 * Open database from name as argument
 * @param { string } databaseName
 */
const openDatabase = (databaseName: string): any => {
    // Enabling debugging SQLite
    SQLite.DEBUG = () => true;

    return SQLite.openDatabase({
        name: databaseName,
        location: 'default',
    });
};

export default openDatabase;
