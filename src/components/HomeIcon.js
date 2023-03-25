import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import styles from './styles';
import { useNavigation } from '@react-navigation/native';

const HomeIcon = () => {
    const navigation = useNavigation();
    return (
        <View>
            <AntDesign 
            name="home" 
            style={styles.MainHomeIcon} 
            onPress={() => navigation.navigate('Main Page')}/>
        </View>
    );
}; 

export default HomeIcon;

const styleSheet = StyleSheet.create({
    title: {
        fontSize: 36,
        fontWeight: '600',
    },
    container: {
        paddingVertical: 16,
        justifyContent: 'center',
        alignItems: 'center',
    },
});