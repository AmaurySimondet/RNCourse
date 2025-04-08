import { View, StyleSheet } from 'react-native';
import Colors from '../constants/colors';
function Card({ children }) {
    return (
        <View style={styles.card}>
            {children}
        </View>
    )
}

export default Card;

const styles = StyleSheet.create({
    card: {
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
        margin: 20,
        gap: 20,
        backgroundColor: Colors.primary300,
        borderRadius: 10,
        elevation: 5,
        shadowColor: 'black',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 6,
    }
})