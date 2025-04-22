import { FlatList } from 'react-native';
import CategoryGridTile from '../components/CategoryGridTile';

import { CATEGORIES } from '../data/dummy-data';

function renderCategoryItem(itemData, navigation) {
  function pressHandler() {
    navigation.navigate('Meals', { categoryId: itemData.item.id });
  }
  return (
    <CategoryGridTile title={itemData.item.title} color={itemData.item.color} onPress={pressHandler} />
  );
}

function CategoriesScreen({ navigation }) {
  return (
    <FlatList
      data={CATEGORIES}
      keyExtractor={(item) => item.id}
      renderItem={(itemData) => renderCategoryItem(itemData, navigation)}
      numColumns={2}
    />
  );
}

export default CategoriesScreen;