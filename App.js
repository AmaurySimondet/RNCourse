import { StyleSheet, SafeAreaView, StatusBar, Pressable } from 'react-native';
import Categories from './screens/Categories';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import Meals from './screens/Meals';
import MealDetails from './screens/MealDetails';
import Favorites from './screens/Favorites';
import { Ionicons } from '@expo/vector-icons';
import FavoritesContextProvider from './store/context/favorites-context';
import { Provider } from 'react-redux';
import store from './store/redux/store';

const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();

function DrawerNavigator() {
  return (
    <Drawer.Navigator screenOptions={{
      headerStyle: { backgroundColor: '#2E0000FF' },
      headerTintColor: 'white',
      headerTitleStyle: { fontWeight: 'bold' },
      sceneContainerStyle: { backgroundColor: '#702222FF' },
      drawerStyle: { backgroundColor: '#702222FF' },
      drawerActiveBackgroundColor: '#CF9191FF',
      drawerActiveTintColor: 'white',
      drawerInactiveTintColor: 'white',
      drawerLabelStyle: { fontWeight: 'bold' },
    }}>
      <Drawer.Screen name="Categories" component={Categories} options={{
        title: 'All Categories',
        drawerIcon: ({ color, size }) => (
          <Ionicons name="list" color={color} size={size} />
        )
      }} />
      <Drawer.Screen name="Favorites" component={Favorites} options={{
        title: 'Favorites',
        drawerIcon: ({ color, size }) => (
          <Ionicons name="star" color={color} size={size} />
        )
      }} />
    </Drawer.Navigator>
  );
}

export default function App() {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="light" />
      {/* <FavoritesContextProvider> */}
      <Provider store={store}>
        <NavigationContainer>
          <Stack.Navigator screenOptions={{
            headerStyle: { backgroundColor: '#2E0000FF' },
            headerTintColor: 'white',
            headerTitleStyle: { fontWeight: 'bold' },
            contentStyle: { backgroundColor: '#702222FF' }
          }}>
            <Stack.Screen name="Drawer" component={DrawerNavigator} options={{
              title: 'All Categories',
              headerShown: false
            }} />
            <Stack.Screen name="Meals" component={Meals} />
            <Stack.Screen name="MealDetails" component={MealDetails} />
          </Stack.Navigator>
        </NavigationContainer>
      </Provider>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#2E0000FF',
  },
});