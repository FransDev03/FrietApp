import React, { FC, useEffect, useState } from 'react';
import { View, Image, ImageSourcePropType } from 'react-native';
import { v4 as uuidv4 } from 'uuid';
import images from '../../functions/image';
import styles from './style';

interface Props {
    stars: number;
}

/**
 * ReviewStars React Native Functional Component
 *
 * Called in each card
 * @param { object } props
 */
const ReviewStars: FC<Props> = ({ stars }) => {
    const [renderStars, setRenderStars] = useState<JSX.Element[]>([]);

    useEffect(() => {
        setRenderStars([]);
        getStars();
    }, []);

    /**
     * Star Function
     *
     * Returns JSX Component based on type
     * @param { string } type
     * @returns { JSX.Element }
     */
    const star = (type: string): JSX.Element => {
        const imageTypes: string[] = Object.keys(images.miscellaneous.star);
        const imageIndex: number = imageTypes.findIndex(
            (image): boolean => image === type,
        );
        const source: ImageSourcePropType[] = Object.values(
            images.miscellaneous.star,
        );

        return (
            <Image
                key={uuidv4()}
                source={source[imageIndex]}
                style={styles.star}
            />
        );
    };

    /**
     * GetStars Function
     *
     * Sets state for renderstars depending on total stars
     */
    const getStars = () => {
        let starsArrayLength: number = 0;
        while (starsArrayLength <= 4) {
            if (stars > 1) {
                setRenderStars((oldRenderStars: JSX.Element[]) => [
                    ...oldRenderStars,
                    star('full'),
                ]);
                stars -= 2;
            } else if (stars === 1) {
                setRenderStars((oldRenderStars: JSX.Element[]) => [
                    ...oldRenderStars,
                    star('half'),
                ]);
                stars -= 1;
            } else {
                setRenderStars((oldRenderStars: JSX.Element[]) => [
                    ...oldRenderStars,
                    star('empty'),
                ]);
            }

            starsArrayLength++;
        }
    };

    return (
        <View style={styles.starsWrapper}>
            {renderStars.map((renderStar: JSX.Element) => renderStar)}
        </View>
    );
};

export default ReviewStars;
