import { StyleSheet, View, Text, TextInput, Alert } from 'react-native';
import { useState } from 'react';
import NiceButton from '../components/NiceButton';
import Card from '../components/Card';

function StartScreen(props) {
    const [number, setNumber] = useState('');

    const handleNumberChange = (text) => {
        setNumber(text);
    }

    const handleReset = () => {
        setNumber('');
    }

    const handleValidate = () => {
        console.log(number);
        if (number.length === 0) {
            Alert.alert('Invalid input', 'Please enter a number', [{ text: 'OK', onPress: handleReset }]);
        } else if (!/^\d+$/.test(number)) {
            Alert.alert('Invalid input', 'Please enter only digits', [{ text: 'OK', onPress: handleReset }]);
        } else if (parseInt(number) < 1 || parseInt(number) > 99) {
            Alert.alert('Invalid input', 'Please enter a number between 1 and 99, not ' + number, [{ text: 'OK', onPress: handleReset }]);
        } else {
            props.onValidate(parseInt(number));
        }
    }

    return (
        <Card>
            <Text>Let's play a game ! I will guess your number</Text>
            <TextInput placeholder="Enter number" onChangeText={handleNumberChange} value={number} keyboardType="numeric" maxLength={2} />
            <View style={styles.buttonContainer}>
                <View style={styles.button}>
                    <NiceButton title="Reset" onPress={handleReset} backgroundColor="black" />
                </View>
                <View style={styles.button}>
                    <NiceButton title="Let's go" onPress={() => handleValidate(number)} />
                </View>
            </View>
        </Card>
    );
}

const styles = StyleSheet.create({
    buttonContainer: {
        flexDirection: 'row',
        gap: 20,
        width: '100%',
    },

    button: {
        flex: 1,
    }
})

export default StartScreen;