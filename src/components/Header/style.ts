import { StyleSheet } from 'react-native';
import { colors } from '../../styles';

export default StyleSheet.create({
    headerBackground: {
        position: 'relative',
        width: '100%',
        height: '25%',
        backgroundColor: colors.yellow,
        borderBottomLeftRadius: 8,
        borderBottomRightRadius: 8,
    },
    headerGradient: {
        position: 'absolute',
        height: '20%',
        width: '100%',
        zIndex: 1,
    },
    headerImageContainer: {
        position: 'absolute',
        width: '100%',
        height: '15%',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 1,
    },
    headerImage: {
        width: 100,
        height: 100,
    },
});
