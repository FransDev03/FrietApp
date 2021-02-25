import { v4 as uuidv4 } from 'uuid';
import 'react-native-get-random-values';
import { Alert } from 'react-native';
import initial from './initial';
import executeMigrations from './migrations';
import { search, insert, deleteRow, update } from './query';

interface Item {
    [index: number]: string | null | number;
}

/**
 * Database Class
 *
 * This class gets called in view where method are executed
 */
export default class Database {
    constructor() {
        const initializeDatabase = async () => {
            await initial();
            await executeMigrations();
        };

        // Initialize Database functions and execute migrations
        initializeDatabase();
    }

    /**
     * GetItem Method
     *
     * Fetches 1 item based on uuid
     * @param { string }
     * @returns { array } item
     */
    getItem = async (uuid: string): Promise<any> => {
        if (!uuid) return [];

        const item: any = await search({
            table: 'items',
            where: { id: uuid },
        });
        if (item.length === 0) return [];

        const positives: any = await search({
            table: 'positives',
            where: { id: item[0].id },
        });
        const negatives: any = await search({
            table: 'negatives',
            where: { id: item[0].id },
        });
        positives.forEach(
            (positive: any, i: number) => (positives[i] = positive.positive),
        );
        negatives.forEach(
            (negative: any, i: number) => (negatives[i] = negative.negative),
        );

        return [item, positives, negatives];
    };

    /**
     * GetItems Method
     *
     * @returns { array } items
     */
    getItems = async (): Promise<any[]> => {
        return search({
            table: 'items',
            sort: { order: ['stars'], asc: false },
        });
    };

    /**
     * FilterItems Method
     *
     * Filters items if searched
     * @param { string } filter
     * @returns { array } items
     */
    filterItems = async (filter: string = ''): Promise<any> => {
        if (!filter) return await this.getItems();

        const items: any[] = await search({
            table: 'items',
            where: {
                name: ['%' + filter + '%', 'LIKE'],
            },
        });
        const idsByPositives: any = await search({
            table: 'positives',
            select: ['items_id'],
            where: {
                positive: ['%' + filter + '%', 'LIKE'],
            },
        });

        let itemsByPositives = [];
        for (let i = 0; i < idsByPositives.length; i++) {
            const itemByPositives: any = await search({
                table: 'items',
                where: {
                    id: idsByPositives[i].items_id,
                },
            });

            if (itemByPositives.length > 0) {
                for (let j = 0; j < items.length; j++) {
                    if (items[j].id === itemByPositives[0].id) {
                        itemsByPositives.push(itemByPositives[0]);
                        break;
                    }
                }
            }
        }
        itemsByPositives = itemsByPositives.concat(items);

        return itemsByPositives.sort((a, b) => (a.stars > b.stars ? -1 : 1));
    };

    /**
     * InsertItem Method
     *
     * @param { array, array, array }
     */
    insertItem = async (
        item: Item,
        positives: string[] = [],
        negatives: string[] = [],
    ): Promise<any> => {
        const checkForItem: object[] = await search({
            table: 'items',
            select: ['id'],
            where: { name: item[0] },
        });

        try {
            if (!checkForItem[0]) return;

            const id: string = uuidv4();

            await insert('items', [
                {
                    id: id,
                    name: item[0],
                    location: item[1],
                    image_url: item[2],
                    stars: item[3],
                },
            ]);

            positives.forEach(async (positive: string) => {
                await insert('positives', [
                    {
                        id: uuidv4(),
                        items_id: id,
                        positive: positive,
                    },
                ]);
            });

            negatives.forEach(async (negative: string) => {
                await insert('negatives', [
                    {
                        id: uuidv4(),
                        items_id: id,
                        positive: negative,
                    },
                ]);
            });
        } catch {
            Alert.alert('');
            return false;
        }
    };

    /**
     * ChangeItem Method
     *
     * Change item based on id in item
     * @param { array, array, array }
     */
    changeItem = async (
        item: Item = [],
        positives: string[] = [],
        negatives: string[] = [],
    ): Promise<any> => {
        try {
            await update(
                'items',
                {
                    name: item[1],
                    location: item[2],
                    image_url: item[3],
                    stars: item[4],
                },
                { id: item[0] },
            );
            positives.forEach(async (positive: string) => {
                const positiveExists: any[] = await search({
                    table: 'positives',
                    select: ['positive'],
                    where: { items: item[0], positive: positive },
                });

                positiveExists.length > 0
                    ? await update(
                          'positives',
                          {
                              positive: positive,
                          },
                          {
                              items_id: item[0],
                              positive: positiveExists[0].positive,
                          },
                      )
                    : await insert('positives', [
                          {
                              id: uuidv4(),
                              items_id: item[0],
                              positive: positive,
                          },
                      ]);
            });

            negatives.forEach(async (negative: string) => {
                const negativeExists: any[] = await search({
                    table: 'negatives',
                    select: ['negative'],
                    where: { items: item[0], negative: negative },
                });

                negativeExists.length > 0
                    ? await update(
                          'negatives',
                          {
                              negative: negative,
                          },
                          {
                              items_id: item[0],
                              negative: negativeExists[0].negative,
                          },
                      )
                    : await insert('negatives', [
                          {
                              id: uuidv4(),
                              items_id: item[0],
                              negative: negative,
                          },
                      ]);
            });
        } catch {
            Alert.alert('');
        }
    };

    /**
     * RemoveItem Method
     *
     * Removes item from database based on item uuid
     *
     * @param { string } uuid
     */
    removeItem = async (uuid: string): Promise<any> => {
        await deleteRow('items', { id: uuid });
        await deleteRow('positives', { items_id: uuid });
        await deleteRow('negatives', { items_id: uuid });
    };
}
