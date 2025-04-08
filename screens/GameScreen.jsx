import { View, Text, StyleSheet, Alert } from 'react-native';
import { useState, useEffect } from 'react';
import NiceButton from '../components/NiceButton';
import Card from '../components/Card';
import { AntDesign } from '@expo/vector-icons';
function GameScreen(props) {
    const firstGuess = Math.floor(Math.random() * 99) + 1;
    const [guess, setGuess] = useState(firstGuess);
    const [min, setMin] = useState(1);
    const [max, setMax] = useState(99);
    const [count, setCount] = useState(1);

    const handleLower = () => {
        if (props.number >= guess) {
            Alert.alert('Don\'t lie to me !', 'The number is higher than my guess !', [{ text: 'I apologize' }]);
            return;
        }
        const newMax = guess;
        setMax(newMax);
        setGuess(Math.floor((min + newMax) / 2));
        setCount(count + 1);
    }

    const handleHigher = () => {
        if (props.number <= guess) {
            Alert.alert('Don\'t lie to me !', 'The number is lower than my guess !', [{ text: 'I apologize' }]);
            return;
        }
        const newMin = guess;
        setMin(newMin);
        setGuess(Math.floor((newMin + max) / 2));
        setCount(count + 1);
    }

    useEffect(() => {
        if (guess === props.number) {
            props.onGuess(count);
        }
    }, [guess]);

    return (
        <Card>
            <Text>I'm guessing your number... ({props.number})</Text>
            <Text style={styles.guessText}>My guess is {guess}</Text>
            <Text>I've guessed {count} times</Text>
            <View style={styles.buttonContainer}>
                <View style={styles.button}>
                    <NiceButton onPress={handleLower} children={<AntDesign name="minuscircle" size={24} color="black" />} />
                </View>
                <View style={styles.button}>
                    <NiceButton onPress={handleHigher} children={<AntDesign name="pluscircle" size={24} color="black" />} />
                </View>
            </View>
            <NiceButton title="Go Back" onPress={() => props.onGoBack()} backgroundColor="black" />
        </Card>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    buttonContainer: {
        flexDirection: 'row',
        gap: 20,
        width: '100%',
    },

    button: {
        flex: 1,
    },
    guessText: {
        fontSize: 20,
        fontWeight: 'bold',
        fontFamily: 'Poppins_400Regular',
    },
    alertText: {
        color: 'red',
        fontWeight: 'bold',
        fontFamily: 'Poppins_400Regular',
    },
})

export default GameScreen;