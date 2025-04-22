import { MEALS, CATEGORIES } from '../data/dummy-data';
import { useLayoutEffect } from 'react';
import MealsList from '../components/MealsList';
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

    return <MealsList items={displayedMeals} />
}

export default Meals;