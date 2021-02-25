import React, { FC } from 'react';
import { View, Image, ImageSourcePropType } from 'react-native';
import styles from './style';

const gradient: ImageSourcePropType = require('../../assets/images/miscellaneous/gradient.png');
const icon: ImageSourcePropType = require('../../assets/images/miscellaneous/logo.png');

/**
 * Header React Native Functional Component
 *
 * Header Homescreen
 */
const Header: FC = () => {
    return (
        <>
            <View style={styles.headerBackground} />
            <Image
                style={styles.headerGradient}
                resizeMode="stretch"
                source={gradient}
            />
            <View style={styles.headerImageContainer}>
                <Image style={styles.headerImage} source={icon} />
            </View>
        </>
    );
};

export default Header;
