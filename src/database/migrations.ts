import AsyncStorage from '@react-native-async-storage/async-storage';

/**
 * ExecuteMigrations Function
 *
 * Make sure to put function name as argument as type array in handlemigrations function in order to execute it
 */
const executeMigrations = async () => {
    handleMigrations();
};

/**
 * HandleMigrations Function
 *
 * Handles all migration functions
 * Executes function if it has not been executed before
 * @param migrations array
 */
const handleMigrations = async (migrations: any[] = []) => {
    const executedMigrations: any = await AsyncStorage.getItem(
        'executedMigrations',
    );
    migrations.forEach((migration) => {
        if (
            !executedMigrations
                .split(' ')
                .includes(migration.toString().slice(9, -5))
        ) {
            migration();
        }
    });
    await AsyncStorage.setItem(
        'executedMigrations',
        migrations
            .map((migration) => migration.toString().slice(9, -5))
            .join(' '),
    );
};

export default executeMigrations;
