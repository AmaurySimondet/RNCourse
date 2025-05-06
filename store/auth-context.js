import { createContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const AuthContext = createContext({
    token: '',
    isAuthenticated: false,
    authenticate: () => { },
    logout: () => { },
});

export default function AuthContextProvider({ children }) {
    const [authToken, setAuthToken] = useState();

    useEffect(() => {
        async function fetchToken() {
            const token = await AsyncStorage.getItem('token');
            if (token) {
                setAuthToken(token);
            }
        }
        fetchToken();
    }, []);

    function authenticate(token) {
        setAuthToken(token);
        AsyncStorage.setItem('token', token);
    }

    function logout() {
        setAuthToken(null);
        AsyncStorage.removeItem('token');
    }

    const value = {
        token: authToken,
        isAuthenticated: !!authToken,
        authenticate: authenticate,
        logout: logout,
    };
    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}