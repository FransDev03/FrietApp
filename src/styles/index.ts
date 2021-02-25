import { StyleSheet } from 'react-native';

interface Colors {
    white: string;
    black: string;
    lightGrey: string;
    yellow: string;
    red: string;
}

interface Fonts {
    poppins: Poppins;
}

interface Poppins {
    regular: string;
    semiBold: string;
}

export const colors: Colors = {
    white: '#FFFFFF',
    black: '#000000',
    lightGrey: '#EBEBEB',
    yellow: '#FFDB7B',
    red: '#D20000',
};

export const fonts: Fonts = {
    poppins: {
        regular: 'Poppins-Regular',
        semiBold: 'Poppins-SemiBold',
    },
};

export default StyleSheet.create({
    container: {
        backgroundColor: colors.lightGrey,
        flex: 1,
    },
});
