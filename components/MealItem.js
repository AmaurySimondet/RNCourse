import { View, Text, StyleSheet, Pressable, Image, Platform } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import MealDetailsComponent from './MealDetailsComponent';

function MealItem({ title, imageUrl, duration, complexity, affordability, id }) {

    const navigation = useNavigation();

    const pressHandler = () => {
        navigation.navigate('MealDetails', { mealId: id });
    }

    return <View style={styles.mealItem}>
        <Pressable style={({ pressed }) => pressed && styles.buttonPressed} android_ripple={{ color: '#ccc' }} onPress={pressHandler}>
            <View>
                <Image source={{ uri: imageUrl }} style={styles.image} />
                <Text style={styles.title}>{title}</Text>
            </View>
            <MealDetailsComponent
                duration={duration}
                complexity={complexity}
                affordability={affordability}
            />
        </Pressable>
    </View>
}

const styles = StyleSheet.create({
    image: {
        width: '100%',
        height: 200,
        borderRadius: 8
    },
    title: {
        fontWeight: 'bold',
        textAlign: 'center',
        fontSize: 18,
        margin: 8
    },
    mealItem: {
        margin: 16,
        borderRadius: 8,
        overflow: Platform.OS === 'android' ? 'hidden' : 'visible',
        backgroundColor: 'white',
        elevation: 4,
        shadowColor: 'black',
        shadowOpacity: 0.25,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 8
    },
    buttonPressed: {
        opacity: 0.5
    }
})
export default MealItem;