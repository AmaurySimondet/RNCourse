import { View, Text, Image, StyleSheet, ScrollView } from 'react-native';
import { MEALS } from '../data/dummy-data';
import MealDetailsComponent from '../components/MealDetailsComponent';
import List from '../components/List';
import { useState, useLayoutEffect, useContext } from 'react';
import IconButton from '../components/IconButton';
import { FavoritesContext } from '../store/context/favorites-context';

function MealDetails({ route, navigation }) {
    const { ids, addFavorite, removeFavorite } = useContext(FavoritesContext);
    const { mealId } = route.params;
    const mealIsFavorite = ids.includes(mealId);
    const meal = MEALS.find((meal) => meal.id === mealId);

    function changeFavoriteStatusHandler() {
        if (mealIsFavorite) {
            removeFavorite(mealId);
        } else {
            addFavorite(mealId);
        }
    }

    useLayoutEffect(() => {
        navigation.setOptions({
            headerRight: () => {
                return <IconButton icon={mealIsFavorite ? 'star' : 'star-outline'} color='white' size={24} onPress={changeFavoriteStatusHandler} />
            }
        })
    }, [navigation, changeFavoriteStatusHandler]);

    return <ScrollView>
        <Image source={{ uri: meal.imageUrl }} style={styles.image} />
        <Text style={styles.title}>{meal.title}</Text>
        <MealDetailsComponent
            duration={meal.duration}
            complexity={meal.complexity}
            affordability={meal.affordability}
            textStyle={styles.detailText}
        />
        <View style={styles.listContainer}>
            <Text style={styles.subtitle}>Ingredients</Text>
            <List data={meal.ingredients} />
            <Text style={styles.subtitle}>Steps</Text>
            <List data={meal.steps} />
        </View>
    </ScrollView>
}

const styles = StyleSheet.create({
    image: {
        width: '100%',
        height: 350
    },
    title: {
        fontWeight: 'bold',
        fontSize: 24,
        margin: 8,
        textAlign: 'center',
        color: 'white'
    },
    detailText: {
        color: 'white'
    },
    subtitle: {
        color: '#CAAC90FF',
        fontSize: 18,
        fontWeight: 'bold',
        margin: 4,
        textAlign: 'center',
        borderBottomWidth: 2,
        borderBottomColor: '#CAAC90FF',
        width: '80%',
        alignSelf: 'center'
    },
    listContainer: {
        padding: 12,
        marginBottom: 12
    }
});

export default MealDetails;