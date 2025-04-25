import { View, Text, StyleSheet } from 'react-native';
import ExpensesSummary from './ExpensesSummary.js';
import ExpensesList from './ExpensesList.js';
import { GlobalStyles } from '../../constants/styles';

const dummyExpenses = [
    { id: 'e1', amount: 19.99, date: new Date('2021-01-19'), description: 'A pair of shoes' },
    { id: 'e2', amount: 10.99, date: new Date('2021-01-01'), description: 'Groceries' },
    { id: 'e3', amount: 12.99, date: new Date('2021-01-01'), description: 'Fuel' },
    { id: 'e4', amount: 15.99, date: new Date('2021-01-01'), description: 'A pair of socks' },
    { id: 'e5', amount: 9.99, date: new Date('2021-01-01'), description: 'A book' },
    { id: 'e6', amount: 19.99, date: new Date('2021-01-19'), description: 'A pair of shoes' },
    { id: 'e7', amount: 10.99, date: new Date('2021-01-01'), description: 'Groceries' },
    { id: 'e8', amount: 12.99, date: new Date('2021-01-01'), description: 'Fuel' },
    { id: 'e9', amount: 15.99, date: new Date('2021-01-01'), description: 'A pair of socks' },
    { id: 'e10', amount: 9.99, date: new Date('2021-01-01'), description: 'A book' },
];

function ExpensesOutput({ expensesPeriod }) {
    return (
        <View style={styles.container}>
            <ExpensesSummary expenses={dummyExpenses} periodName={expensesPeriod} />
            <ExpensesList expenses={dummyExpenses} />
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
});
