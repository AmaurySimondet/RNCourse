import { StyleSheet, Text, View, Alert } from 'react-native';
import axios from 'axios';
import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../store/auth-context';

function WelcomeScreen() {
  const [fetchedMessage, setFetchedMessage] = useState('');
  const authCtx = useContext(AuthContext);
  const url = 'https://react-native-course-a1ab8-default-rtdb.europe-west1.firebasedatabase.app/message.json';

  useEffect(() => {
    axios.get(url + '?auth=' + authCtx.token).then(response => {
      setFetchedMessage(response.data);
    }).catch(error => {
      Alert.alert('Error fetching messages', 'Could not fetch messages from the server. Please try again later.');
    });
  }, [authCtx.token]);

  return (
    <View style={styles.rootContainer}>
      <Text style={styles.title}>Welcome!</Text>
      <Text>You authenticated successfully!</Text>
      <Text>{fetchedMessage}</Text>
    </View>
  );
}

export default WelcomeScreen;

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 32,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 8,
  },
});
