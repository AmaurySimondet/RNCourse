import { View, TextInput, Button, StyleSheet, Modal, Image } from 'react-native';
import { useState } from 'react';

function GoalInput(props) {
    const [text, setText] = useState('');

    const handleChangeText = (text) => {
        setText(text);
    };

    return <Modal visible={props.visible} animationType="slide">
        <View style={styles.addSection}>
            <Image source={require('../assets/favicon.png')} style={styles.image} />
            <TextInput style={styles.input} placeholder="Add a new todo" onChangeText={handleChangeText} />
            <View style={styles.buttonContainer}>
                <View style={styles.button}>
                    <Button title="Cancel" onPress={props.onCancel} color="red" />
                </View>
                <View style={styles.button}>
                    <Button title="Add Todo" onPress={() => {
                        if (text.length > 0) {
                            props.handleAddTodo(text);
                            setText('');
                        }
                    }} color="red" />
                </View>
            </View>
        </View>
    </Modal>
}

export default GoalInput;

const styles = StyleSheet.create({
    input: {
        borderWidth: 1,
        borderColor: 'gray',
        borderRadius: 5,
        padding: 10,
        marginBottom: 10,
        width: '80%',
        color: 'white',
    },
    addSection: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 10,
        backgroundColor: '#9b0000',
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        gap: 10,
        width: '80%',
    },
    button: {
        width: '40%',
    },
    image: {
        width: 100,
        height: 100,
        marginBottom: 10,
    },
});