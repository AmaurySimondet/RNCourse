import { View, FlatList, StyleSheet, Text } from 'react-native';
import { MEALS, CATEGORIES } from '../data/dummy-data';
import MealItem from '../components/MealItem';
import { useLayoutEffect } from 'react';

function Meals({ route, navigation }) {
    const catId = route.params.categoryId;
    const catTitle = CATEGORIES.find((category) => category.id === catId).title;

    useLayoutEffect(() => {
        navigation.setOptions({
            title: catTitle
        });
    }, [catTitle, navigation]);

    const displayedMeals = MEALS.filter((mealItem) => {
        return mealItem.categoryIds.indexOf(catId) >= 0; // trick to check if in, because else returns -1
    });

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
        <FlatList data={displayedMeals} renderItem={renderMealItem} keyExtractor={(item) => item.id} />
    </View>
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
    },
});

export default Meals;