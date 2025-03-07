import { View, Text, StyleSheet } from 'react-native';

function GoalItem(props) {
    return (
        <View style={styles.todo}>
            <Text style={styles.todoText}>{props.item.text}</Text>
        </View>
    );
}

export default GoalItem;

const styles = StyleSheet.create({
    todo: {
        padding: 10,
        backgroundColor: '#9b0000',
        borderRadius: 5,
        marginBottom: 10,
    },
    todoText: {
        color: 'white',
    },
});