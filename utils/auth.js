import axios from 'axios';
const FIREBASE_URL = 'https://identitytoolkit.googleapis.com/v1/accounts:';
const API_KEY = 'AIzaSyDk-lqXyvBcI0_XwRdCfD4HZ6uEPlMQuLA';

async function authenticate(mode, email, password) {
    const url = `${FIREBASE_URL}${mode}?key=${API_KEY}`;
    const response = await axios.post(
        url,
        {
            email: email,
            password: password,
            returnSecureToken: true,
        },
    );

    const token = response.data.idToken;
    return token;
}

async function createUser(email, password) {
    return await authenticate('signUp', email, password);
}

async function login(email, password) {
    return await authenticate('signInWithPassword', email, password);
}

export { createUser, login };