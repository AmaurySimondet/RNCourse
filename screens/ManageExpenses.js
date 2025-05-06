import { View, Text, StyleSheet } from 'react-native';
import { useLayoutEffect } from 'react';
import IconButton from '../UI/IconButton';
import { GlobalStyles } from '../constants/styles';
import Button from '../UI/Button';
import { ExpensesContext } from '../store/expenses-context';
import { useContext } from 'react';
import ExpenseForm from '../components/ManageExpense/ExpenseForm';
import { storeExpense, updateExpense, deleteExpense } from '../utils/http';
import LoadingOverlay from '../UI/LoadingOverlay';
import { useState } from 'react';
import ErrorOverlay from '../UI/ErrorOverlay';

function ManageExpenses({ route, navigation }) {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState();
    const expenseId = route.params?.expenseId;
    const isEditing = !!expenseId;
    const expensesCtx = useContext(ExpensesContext);
    const selectedExpense = expensesCtx.expenses.find((expense) => expense.id === expenseId);

    useLayoutEffect(() => {
        navigation.setOptions({
            title: isEditing ? 'Edit Expense' : 'Add Expense',
        });
    }, [navigation, isEditing]);

    async function deleteExpenseHandler() {
        setIsLoading(true);
        try {
            expensesCtx.deleteExpense(expenseId);
            await deleteExpense(expenseId);
        } catch (error) {
            setError('Deleting expense failed.');
        }
        setIsLoading(false);
        navigation.goBack();
    }

    function cancelHandler() {
        navigation.goBack();
    }

    async function confirmHandler(expenseData) {
        setIsLoading(true);
        if (isEditing) {
            expensesCtx.updateExpense(expenseId, expenseData);
            try {
                await updateExpense(expenseId, expenseData);
            } catch (error) {
                setError('Updating expense failed.');
            }
        } else {
            try {
                const id = await storeExpense(expenseData);
                expensesCtx.addExpense({ ...expenseData, id: id });
            } catch (error) {
                setError('Storing expense failed.');
            }
        }
        setIsLoading(false);
        navigation.goBack();
    }

    function errorHandler() {
        setError(null);
    }

    if (error) {
        return <ErrorOverlay message={error} onConfirm={errorHandler} />;
    }

    if (isLoading) {
        return <LoadingOverlay />;
    }

    return (
        <View style={styles.container}>
            <ExpenseForm onCancel={cancelHandler} onSubmit={confirmHandler} onDelete={deleteExpenseHandler} isEditing={isEditing} defaultValues={selectedExpense} />
        </View>
    );
}

export default ManageExpenses;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 24,
        backgroundColor: GlobalStyles.colors.primary800,
    },
});