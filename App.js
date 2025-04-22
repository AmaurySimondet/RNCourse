import { StyleSheet, SafeAreaView, StatusBar, Pressable } from 'react-native';
import Categories from './screens/Categories';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Meals from './screens/Meals';
import MealDetails from './screens/MealDetails';
import { Ionicons } from '@expo/vector-icons';
const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="light" />
      <NavigationContainer>
        <Stack.Navigator screenOptions={{
          headerStyle: { backgroundColor: '#2E0000FF' },
          headerTintColor: 'white',
          headerTitleStyle: { fontWeight: 'bold' },
          contentStyle: { backgroundColor: '#702222FF' }
        }}>
          <Stack.Screen name="Categories" component={Categories} options={{
            title: 'All Categories',
          }} />
          <Stack.Screen name="Meals" component={Meals} />
          <Stack.Screen name="MealDetails" component={MealDetails} />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#2E0000FF',
  },
});