import AuthContent from '../components/Auth/AuthContent';
import { login } from '../utils/auth';
import { useState, useContext } from 'react';
import LoadingOverlay from '../components/ui/LoadingOverlay';
import { Alert } from 'react-native';
import { AuthContext } from '../store/auth-context';

function LoginScreen() {
  const [isAuthenticating, setIsAuthenticating] = useState(false);
  const authCtx = useContext(AuthContext);

  async function loginHandler(credentials) {
    setIsAuthenticating(true);
    try {
      const token = await login(credentials.email, credentials.password);
      authCtx.authenticate(token);
    } catch (error) {
      Alert.alert('Authentication failed', 'Could not log in. Please check your credentials or try again later.');
    }
    setIsAuthenticating(false);
  }

  if (isAuthenticating) {
    return <LoadingOverlay message="Logging in..." />;
  }

  return <AuthContent isLogin={true} onAuthenticate={loginHandler} />;
}

export default LoginScreen;
