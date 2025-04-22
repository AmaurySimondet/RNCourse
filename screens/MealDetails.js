import { View, Text, Image, StyleSheet, ScrollView } from 'react-native';
import { MEALS } from '../data/dummy-data';
import MealDetailsComponent from '../components/MealDetailsComponent';
import List from '../components/List';
import { useState, useLayoutEffect, useContext } from 'react';
import IconButton from '../components/IconButton';
import { useSelector, useDispatch } from 'react-redux';
import { addFavorite, removeFavorite } from '../store/redux/favorites';

function MealDetails({ route, navigation }) {
    const favoriteMealIds = useSelector((state) => state.favoriteMeals.ids);
    console.log(favoriteMealIds);
    const { mealId } = route.params;
    const mealIsFavorite = favoriteMealIds.includes(mealId);
    const meal = MEALS.find((meal) => meal.id === mealId);
    const dispatch = useDispatch();

    function changeFavoriteStatusHandler() {
        if (mealIsFavorite) {
            console.log('Removing favorite');
            dispatch(removeFavorite({ id: mealId }));
        } else {
            console.log('Adding favorite');
            dispatch(addFavorite({ id: mealId }));
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