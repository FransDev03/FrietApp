import { createTable } from './query';

// Creates initial tables
const initial = async () => {
    await createTable('items', {
        id: 'CHAR(36) PRIMARY KEY NOT NULL',
        name: 'VARCHAR(90) NOT NULL',
        location: 'VARCHAR(255)',
        image_url: 'VARCHAR(255)',
        stars: 'INT NOT NULL',
    });
    await createTable('positives', {
        id: 'CHAR(36) PRIMARY KEY NOT NULL',
        items_id: 'CHAR(36) NOT NULL',
        positive: 'VARCHAR(90) NOT NULL',
    });
    await createTable('negatives', {
        id: 'CHAR(36) PRIMARY KEY NOT NULL',
        items_id: 'CHAR(36) NOT NULL',
        negative: 'VARCHAR(90) NOT NULL',
    });
};

export default initial;
