import { View, Text, StyleSheet, Pressable } from 'react-native';

function GoalItem(props) {
    return (
        <View style={styles.todo}>
            <Pressable onPress={props.onDeleteItem.bind(this, props.item.id)} style={({ pressed }) => pressed && styles.pressedItem}>
                <Text style={styles.todoText}>{props.item.text}</Text>
            </Pressable>
        </View>
    );
}

export default GoalItem;

const styles = StyleSheet.create({
    todo: {
        padding: 10,
        backgroundColor: 'red',
        borderRadius: 5,
        marginBottom: 10,
    },
    todoText: {
        color: 'white',
    },
    pressedItem: {
        opacity: 0.5,
    },
});