import { View, Text, StyleSheet } from 'react-native';
import { useContext } from 'react';
import { FavoritesContext } from '../store/context/favorites-context';
import MealsList from '../components/MealsList';
import { MEALS } from '../data/dummy-data';

function Favorites() {

    const { ids } = useContext(FavoritesContext);

    if (ids.length === 0) {
        return (
            <View style={styles.container}>
                <Text style={styles.text}>No favorites found.</Text>
            </View>
        );
    }
    else {
        const favoriteMeals = MEALS.filter((mealItem) => {
            return ids.includes(mealItem.id);
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
