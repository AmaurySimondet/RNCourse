import { createContext, useReducer } from "react";

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


const ExpensesContext = createContext({
    expenses: [],
    addExpense: ({ description, amount, date }) => { },
    deleteExpense: (id) => { },
    updateExpense: (id, { description, amount, date }) => { },
});

function expensesReducer(state, action) {
    switch (action.type) {
        case "ADD":
            return [{ ...action.payload, id: new Date() + Math.random().toString() }, ...state];
        case "UPDATE":
            const updatableExpenseIndex = state.findIndex(
                (expense) => expense.id === action.payload.id
            );
            const updatableExpense = state[updatableExpenseIndex];
            const updatedItem = { ...updatableExpense, ...action.payload.data };
            const updatedExpenses = [...state];
            updatedExpenses[updatableExpenseIndex] = updatedItem;
            return updatedExpenses;
        case "DELETE":
            return state.filter((expense) => expense.id !== action.payload);
        default:
            return state;
    }
}

function ExpensesContextProvider({ children }) {
    const [expensesState, dispatch] = useReducer(expensesReducer, dummyExpenses);

    function addExpense(expenseData) {
        dispatch({ type: "ADD", payload: expenseData });
    }

    function deleteExpense(id) {
        dispatch({ type: "DELETE", payload: id });
    }

    function updateExpense(id, expenseData) {
        dispatch({ type: "UPDATE", payload: { id, data: expenseData } });
    }

    const value = {
        expenses: expensesState,
        addExpense: addExpense,
        deleteExpense: deleteExpense,
        updateExpense: updateExpense,
    }


    return <ExpensesContext.Provider value={value}>{children}</ExpensesContext.Provider>
}

export default ExpensesContextProvider;
export { ExpensesContext };