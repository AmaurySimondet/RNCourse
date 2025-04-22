import { View, Text, StyleSheet } from 'react-native';
import MealsList from '../components/MealsList';
import { MEALS } from '../data/dummy-data';
import { useSelector } from 'react-redux';

function Favorites() {

    const favoriteMealIds = useSelector((state) => state.favoriteMeals.ids);

    if (favoriteMealIds.length === 0) {
        return (
            <View style={styles.container}>
                <Text style={styles.text}>No favorites found.</Text>
            </View>
        );
    }
    else {
        const favoriteMeals = MEALS.filter((mealItem) => {
            return favoriteMealIds.includes(mealItem.id);
        });
        return (
            <MealsList items={favoriteMeals} />
        );
    }
}

export default Favorites;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },

    text: {
        fontSize: 18,
        fontWeight: 'bold',
    },
});
