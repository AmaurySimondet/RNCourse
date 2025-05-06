import ExpensesOutput from '../components/Expenses/ExpensesOutput';
import { ExpensesContext } from '../store/expenses-context';
import { useContext } from 'react';
import { getDateMinusDays } from '../utils/date';
import { fetchExpenses } from '../utils/http';
import { useEffect, useState } from 'react';
import LoadingOverlay from '../UI/LoadingOverlay';
import ErrorOverlay from '../UI/ErrorOverlay';
function RecentExpenses() {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState();
    const expensesCtx = useContext(ExpensesContext);

    useEffect(() => {
        async function getExpenses() {
            setIsLoading(true);
            try {
                const expenses = await fetchExpenses();
                expensesCtx.setExpenses(expenses);
            } catch (error) {
                setError('Could not fetch expenses!');
            }
            setIsLoading(false);
        }
        getExpenses();
    }, []);

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
        <ExpensesOutput expenses={expensesCtx.expenses} expensesPeriod="Last 7 days" fallbackText="No expenses found for the last 7 days." />
    );
}

export default RecentExpenses;