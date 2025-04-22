import { StyleSheet, Text, View, StatusBar } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import WelcomeScreen from './screens/WelcomeScreen';
import UserScreen from './screens/UserScreen';
import Ionicons from '@expo/vector-icons/Ionicons';
const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <View style={styles.container}>
      <StatusBar style="light" />
      <NavigationContainer>
        <Tab.Navigator screenOptions={{
          headerStyle: { backgroundColor: '#2E0000FF' },
          headerTintColor: 'white',
          headerTitleStyle: { fontWeight: 'bold' },
          contentStyle: { backgroundColor: '#702222FF' },
          tabBarStyle: { backgroundColor: '#702222FF' },
          tabBarInactiveBackgroundColor: '#CF9191FF',
          tabBarActiveTintColor: 'white',
          tabBarInactiveTintColor: 'white',
          tabBarLabelStyle: { fontWeight: 'bold' },
        }}>
          <Tab.Screen name="Welcome" component={WelcomeScreen} options={{
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="home" color={color} size={size} />
            ),
          }} />
          <Tab.Screen name="User" component={UserScreen} options={{
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="person" color={color} size={size} />
            ),
          }} />
        </Tab.Navigator>
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