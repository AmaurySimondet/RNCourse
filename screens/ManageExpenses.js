import { View, Text, StyleSheet } from 'react-native';
import { useLayoutEffect } from 'react';
import IconButton from '../UI/IconButton';
import { GlobalStyles } from '../constants/styles';
import Button from '../UI/Button';
function ManageExpenses({ route, navigation }) {
    const expenseId = route.params?.expenseId;
    const isEditing = !!expenseId;

    useLayoutEffect(() => {
        navigation.setOptions({
            title: isEditing ? 'Edit Expense' : 'Add Expense',
        });
    }, [navigation, isEditing]);

    function deleteExpense() {
        console.log('delete expense');
        navigation.goBack();
    }

    function cancelHandler() {
        navigation.goBack();
    }

    function confirmHandler() {
        navigation.goBack();
    }

    return (
        <View style={styles.container}>
            <View style={styles.buttons}>
                <Button mode="flat" onPress={cancelHandler} style={styles.button}>Cancel</Button>
                <Button onPress={confirmHandler} style={styles.button}>Confirm</Button>
            </View>
            {isEditing && <View style={styles.deleteContainer}>
                <IconButton icon="trash" size={36} color={GlobalStyles.colors.error500} onPress={deleteExpense} />
            </View>}
        </View>
    );
}

export default ManageExpenses;

const styles = StyleSheet.create({
    deleteContainer: {
        marginTop: 16,
        padding: 16,
        backgroundColor: GlobalStyles.colors.error50,
        borderRadius: 6,
        alignItems: 'center',
    },
    container: {
        flex: 1,
        padding: 24,
        backgroundColor: GlobalStyles.colors.primary800,
    },
    buttons: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    button: {
        minWidth: 120,
        marginHorizontal: 8,
    },
});