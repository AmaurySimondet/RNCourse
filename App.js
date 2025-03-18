import { useState } from 'react';
import { StyleSheet, View, FlatList, SafeAreaView, Button, StatusBar } from 'react-native';
import GoalItem from './components/GoalItem';
import GoalInput from './components/GoalInput';

export default function App() {
  const [todos, setTodos] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);

  const handleAddTodo = (text) => {
    setTodos([...todos, { id: Math.random().toString(), text }]);
    setModalVisible(false);
  };

  const handleDeleteTodo = (id) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  return (
    <>
      <StatusBar style="light" />
      <SafeAreaView style={styles.container}>
        <Button title="Add Todo" onPress={() => setModalVisible(true)} color="red" />
        <GoalInput handleAddTodo={handleAddTodo} visible={modalVisible} onCancel={() => setModalVisible(false)} />
        <View style={styles.listSection}>
          <FlatList
            data={todos}
            renderItem={({ item }) => (
              <GoalItem item={item} onDeleteItem={handleDeleteTodo} />
            )}
            keyExtractor={item => item.id}
            keyboardShouldPersistTaps="handled"
          />
        </View>
      </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 20,
    backgroundColor: '#9b0000',
  },
  listSection: {
    flex: 5,
    padding: 10,
  },
});
