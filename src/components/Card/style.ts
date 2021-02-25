import { StyleSheet } from 'react-native';
import { colors, fonts } from '../../styles';

export default StyleSheet.create({
    cardContainer: {
        height: 170,
        paddingHorizontal: 15,
        paddingVertical: 13,
    },
    spaceCardContainer: {
        marginTop: '30%',
    },
    card: {
        height: '100%',
        flexDirection: 'row',
        borderRadius: 9,
        backgroundColor: colors.white,
    },
    cardImageContainer: {
        flex: 5,
        justifyContent: 'center',
        alignItems: 'center',
        borderRightWidth: 1,
        borderColor: colors.lightGrey,
        borderRadius: 5,
    },
    cardImage: {
        width: 80,
        height: 80,
    },
    cardContentWrapper: {
        flex: 6,
        overflow: 'hidden',
        justifyContent: 'space-evenly',
        paddingLeft: 15,
    },
    cardContentHeaderText: {
        fontFamily: fonts.poppins.semiBold,
        fontSize: 23,
    },
    cardContentText: {
        fontFamily: fonts.poppins.regular,
        fontSize: 11,
    },
    cardOptions: {
        flex: 2,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: colors.white,
        borderRadius: 10,
    },
    optionsContainer: {
        flexDirection: 'row',
    },
    optionDot: {
        width: 6,
        height: 6,
        backgroundColor: colors.lightGrey,
        borderRadius: 50,
        margin: 1,
    },
});
