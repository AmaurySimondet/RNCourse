import ExpensesOutput from '../components/Expenses/ExpensesOutput';
import { ExpensesContext } from '../store/expenses-context';
import { useContext } from 'react';

function AllExpenses() {
    const expensesCtx = useContext(ExpensesContext);
    return (
        <ExpensesOutput expenses={expensesCtx.expenses} expensesPeriod="Total" fallbackText="No expenses found." />
    );
}

export default AllExpenses;