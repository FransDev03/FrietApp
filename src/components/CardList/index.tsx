import React, { FC, useEffect, useState } from 'react';
import { FlatList, ImageSourcePropType } from 'react-native';
import Database from '../../database';
import Card from '../Card';
import styles from './style';

interface Item {
    id: string;
    name: string;
    imageSource: ImageSourcePropType | null;
    location: string | null;
    stars: number;
    firstItem: boolean;
}

interface RenderItem {
    item: Item;
    index: number;
}

/**
 * CardList React Native Functional Component
 *
 * CardList Homescreen
 */
const CardList: FC = () => {
    const [items, setItems] = useState<Item[]>([]);

    useEffect(() => {
        fetchItems();
    }, []);

    /**
     * FetchItems Function
     *
     * Fetches all items database and sets state
     */
    const fetchItems = async (): Promise<void> => {
        const db: Database = new Database();
        const currentItems: Item[] = await db.getItems();
        setItems(currentItems);
    };

    /**
     * RenderCard Function
     *
     * @param { object }
     * @returns { JSX.Element } Card
     */
    const renderCard = ({ item, index }: RenderItem): JSX.Element => (
        <Card
            name={item.name}
            location={item.location}
            imageSource={item.imageSource}
            stars={item.stars}
            firstItem={index === 0}
        />
    );

    return (
        <FlatList
            data={items}
            renderItem={renderCard}
            keyExtractor={(item) => item.id}
            style={styles.flatList}
        />
    );
};

export default CardList;
