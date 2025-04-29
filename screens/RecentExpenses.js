import ExpensesOutput from '../components/Expenses/ExpensesOutput';
import { ExpensesContext } from '../store/expenses-context';
import { useContext } from 'react';
import { getDateMinusDays } from '../utils/date';

function RecentExpenses() {
    const expensesCtx = useContext(ExpensesContext);
    const recentExpenses = expensesCtx.expenses.filter((expense) => {
        const date7DaysAgo = getDateMinusDays(new Date(), 7);
        return expense.date >= date7DaysAgo;
    });
    return (
        <ExpensesOutput expenses={recentExpenses} expensesPeriod="Last 7 days" fallbackText="No expenses found for the last 7 days." />
    );
}

export default RecentExpenses;