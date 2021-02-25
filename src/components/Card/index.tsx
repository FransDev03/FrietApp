import React, { FC } from 'react';
import {
    TouchableOpacity,
    TouchableNativeFeedback,
    View,
    Text,
    Image,
    ImageSourcePropType,
} from 'react-native';
import styles from './style';
import { colors } from '../../styles';
import ReviewStars from '../ReviewStars';

interface Props {
    name: string;
    imageSource: ImageSourcePropType | null;
    location: string | null;
    stars: number;
    firstItem: boolean;
}

const defaultImage: ImageSourcePropType = require('../../assets/images/miscellaneous/default-image.png');

/**
 * Card React Native Functional Component
 *
 * @param { object } props
 */
const Card: FC<Props> = ({ name, imageSource, location, stars, firstItem }) => {
    return (
        <TouchableOpacity
            activeOpacity={1}
            style={[
                styles.cardContainer,
                firstItem ? styles.spaceCardContainer : {},
            ]}>
            <View style={styles.card}>
                <View style={styles.cardImageContainer}>
                    <Image
                        source={imageSource || defaultImage}
                        style={styles.cardImage}
                    />
                </View>
                <View style={styles.cardContentWrapper}>
                    <View>
                        <Text
                            numberOfLines={1}
                            style={styles.cardContentHeaderText}>
                            {name}
                        </Text>
                        <Text numberOfLines={2} style={styles.cardContentText}>
                            {location}
                        </Text>
                    </View>
                    <ReviewStars stars={stars} />
                </View>
                <TouchableNativeFeedback
                    background={TouchableNativeFeedback.Ripple(
                        colors.lightGrey,
                        true,
                    )}>
                    <View style={styles.cardOptions}>
                        <View style={styles.optionsContainer}>
                            <View style={styles.optionDot} />
                            <View style={styles.optionDot} />
                            <View style={styles.optionDot} />
                        </View>
                    </View>
                </TouchableNativeFeedback>
            </View>
        </TouchableOpacity>
    );
};

export default Card;
