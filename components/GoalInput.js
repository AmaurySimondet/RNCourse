import { View, TextInput, Button, StyleSheet } from 'react-native';
import { useState } from 'react';

function GoalInput(props) {
    const [text, setText] = useState('');

    const handleChangeText = (text) => {
        setText(text);
    };

    return <View style={styles.addSection}>
        <TextInput style={styles.input} placeholder="Add a new todo" onChangeText={handleChangeText} />
        <Button title="Click me" onPress={() => props.handleAddTodo(text)} />
    </View>
}

export default GoalInput;

const styles = StyleSheet.create({
    input: {
        flex: 1,
        borderWidth: 1,
        borderColor: 'gray',
        borderRadius: 5,
        padding: 10,
        marginRight: 10,
    },
    addSection: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        borderBottomColor: 'gray',
        borderBottomWidth: 1,
        borderRadius: 5,
    },
});