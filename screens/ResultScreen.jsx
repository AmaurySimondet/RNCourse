import { View, Text } from 'react-native';
import NiceButton from '../components/NiceButton';

function ResultScreen(props) {
    return (
        <View>
            <Text>I've guessed your number ({props.number}) in {props.count} guesses</Text>
            <NiceButton title="Play again" onPress={() => props.onPlayAgain()} />
        </View>
    );
}

export default ResultScreen;