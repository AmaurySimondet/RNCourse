import { View, Text, StyleSheet } from 'react-native';
import ExpensesSummary from './ExpensesSummary.js';
import ExpensesList from './ExpensesList.js';
import { GlobalStyles } from '../../constants/styles';

function ExpensesOutput({ expenses, expensesPeriod, fallbackText }) {
    return (
        <View style={styles.container}>
            <ExpensesSummary expenses={expenses} periodName={expensesPeriod} />
            {expenses.length > 0 ? <ExpensesList expenses={expenses} /> : <Text style={styles.infoText}>{fallbackText}</Text>}
        </View>
    );
}

export default ExpensesOutput;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 24,
        backgroundColor: GlobalStyles.colors.primary700,
    },
    infoText: {
        color: 'white',
        fontSize: 16,
        textAlign: 'center',
        marginTop: 32,
    },
});
