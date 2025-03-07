import { useState } from 'react';
import { StyleSheet, View, FlatList, SafeAreaView } from 'react-native';
import GoalItem from './components/GoalItem';
import GoalInput from './components/GoalInput';

export default function App() {
  const [todos, setTodos] = useState([]);

  const handleAddTodo = (text) => {
    setTodos([...todos, { id: Math.random().toString(), text }]);
  };

  return (
    <SafeAreaView style={styles.container}>
      <GoalInput handleAddTodo={handleAddTodo} />
      <View style={styles.listSection}>
        <FlatList
          data={todos}
          renderItem={({ item }) => (
            <GoalItem item={item} />
          )}
          keyExtractor={item => item.id}
          keyboardShouldPersistTaps="handled"
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  listSection: {
    flex: 5,
    padding: 10,
  },
});
