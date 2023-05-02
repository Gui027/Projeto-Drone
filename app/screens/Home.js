import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useState } from 'react';
import {
    View,
    StyleSheet,
    Text,
    TouchableOpacity,
    TextInput,
    StatusBar,
    Dimensions,
} from 'react-native';
import colors from '../misc/colors';
import { useNavigation } from '@react-navigation/native';

const Home = ({ user }) => {
    const navigation = useNavigation();

    const handlePressButton = () => {
        navigation.navigate('NoteScreen');
    };

    const handlePressButton2 = () => {
        navigation.navigate('NoteInputModal');
    };

    return (
        <>
            <StatusBar hidden />
            <View style={styles.container}>
                <Text style={styles.inputTitle}>Bem vindo, [NOME]</Text>
                <TouchableOpacity style={styles.button} onPress={handlePressButton}>
                    <Text style={styles.buttonText}>Notas</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.button} onPress={handlePressButton2}>
                    <Text style={styles.buttonText}>Nova Nota</Text>
                </TouchableOpacity>
            </View>
        </>
    );
};

const width = Dimensions.get('window').width - 50;
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    textInput: {
        borderWidth: 2,
        borderColor: colors.PRIMARY,
        color: colors.PRIMARY,
        width,
        height: 50,
        borderRadius: 10,
        paddingLeft: 15,
        fontSize: 25,
        marginBottom: 15,
    },
    inputProdutor: {
        alignSelf: 'flex-start',
        paddingLeft: 25,
        marginBottom: 5,
        opacity: 0.5,
    },
    buttonText: {
        color: 'white',
        fontWeight: 'bold',
        backgroundColor: '#007bff',
        borderRadius: 5,
        color: '#fff',
        cursor: 'pointer',
        fontSize: 18,
        marginVertical: 10,
        paddingHorizontal: 20,
        paddingVertical: 10,
        textAlign: 'center',
    },
    inputTitle: {
        // fontSize: '3rem',
        // marginTop: '3rem',
    }
});

export default Home;