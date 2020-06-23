import { StyleSheet } from 'react-native';
import Constants from 'expo-constants';

export default StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 24,
        paddingTop: Constants.statusBarHeight + 20,
        alignItems: 'center',
        justifyContent: 'center'
    },

    logo: {
        height: 150,
        width: 150,
        resizeMode: 'contain'
    },

    input: {
        padding: 5,
        borderRadius: 8,
        height: 50,
        width: '80%',
    },

    entrar: {
        backgroundColor: '#2c89a0',
        borderRadius: 8,
        height: 50,
        width: '80%',
        justifyContent: 'center',
        alignItems: 'center',
    },

    entrarText: {
        color: '#FFF',
        fontSize: 15,
        fontWeight: 'bold'
    }

});