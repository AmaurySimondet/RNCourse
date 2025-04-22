import { View, FlatList } from 'react-native';
import MealItem from './MealItem';

function MealsList({ items }) {
    const renderMealItem = (itemData) => {
        return <MealItem
            title={itemData.item.title}
            imageUrl={itemData.item.imageUrl}
            duration={itemData.item.duration}
            complexity={itemData.item.complexity}
            affordability={itemData.item.affordability}
            id={itemData.item.id}
        />
    }

    return <View>
        <FlatList data={items} renderItem={renderMealItem} keyExtractor={(item) => item.id} />
    </View>
}

export default MealsList;