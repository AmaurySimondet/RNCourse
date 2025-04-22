import { StyleSheet, Text, View, StatusBar } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import WelcomeScreen from './screens/WelcomeScreen';
import UserScreen from './screens/UserScreen';
import Ionicons from '@expo/vector-icons/Ionicons';
const Drawer = createDrawerNavigator();

export default function App() {
  return (
    <View style={styles.container}>
      <StatusBar style="light" />
      <NavigationContainer>
        <Drawer.Navigator screenOptions={{
          headerStyle: { backgroundColor: '#2E0000FF' },
          headerTintColor: 'white',
          headerTitleStyle: { fontWeight: 'bold' },
          contentStyle: { backgroundColor: '#702222FF' },
          drawerStyle: { backgroundColor: '#702222FF' },
          drawerActiveBackgroundColor: '#CF9191FF',
          drawerActiveTintColor: 'white',
          drawerInactiveTintColor: 'white',
          drawerLabelStyle: { fontWeight: 'bold' },
        }}>
          <Drawer.Screen name="Welcome" component={WelcomeScreen} options={{
            drawerIcon: ({ color, size }) => (
              <Ionicons name="home" color={color} size={size} />
            ),
          }} />
          <Drawer.Screen name="User" component={UserScreen} options={{
            drawerIcon: ({ color, size }) => (
              <Ionicons name="person" color={color} size={size} />
            ),
          }} />
        </Drawer.Navigator>
      </NavigationContainer>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#2E0000FF',
  },
  text: {
    color: 'white',
  },
});