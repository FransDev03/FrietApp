import React, { FC } from 'react';
import { Platform, KeyboardAvoidingView, StatusBar } from 'react-native';
import Header from '../../components/Header';
import CardList from '../../components/CardList';
import styles, { colors } from '../../styles';

const Home: FC = () => {
    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            style={styles.container}>
            <Header />
            <CardList />
            <StatusBar
                backgroundColor={colors.yellow}
                barStyle="dark-content"
            />
        </KeyboardAvoidingView>
    );
};

export default Home;
