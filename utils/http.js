import axios from 'axios';

const FIREBASE_URL = "https://react-native-course-a1ab8-default-rtdb.europe-west1.firebasedatabase.app/"

async function storeExpense(expenseData) {
    const response = await axios.post(
        `${FIREBASE_URL}/expenses.json`,
        expenseData
    );
    const id = response.data.name;
    return id;
}

async function fetchExpenses() {
    const response = await axios.get(`${FIREBASE_URL}/expenses.json`);
    const expenses = [];
    for (const key in response.data) {
        expenses.push({
            id: key,
            amount: response.data[key].amount,
            date: new Date(response.data[key].date),
            description: response.data[key].description
        });
    }
    return expenses;
}

async function updateExpense(id, expenseData) {
    return axios.put(`${FIREBASE_URL}/expenses/${id}.json`, expenseData);
}

async function deleteExpense(id) {
    return axios.delete(`${FIREBASE_URL}/expenses/${id}.json`);
}

export { storeExpense, fetchExpenses, updateExpense, deleteExpense };

