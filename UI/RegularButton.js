import { Pressable, Text, StyleSheet } from 'react-native';
import { Colors } from '../constants/colors';

function RegularButton({ children, onPress }) {
    return (
        <Pressable onPress={onPress} style={({ pressed }) => [styles.button, pressed && styles.pressed]}>
            <Text style={styles.text}>{children}</Text>
        </Pressable>
    )
}

export default RegularButton;

const styles = StyleSheet.create({
    button: {
        padding: 8,
        borderRadius: 4,
        marginVertical: 4,
        backgroundColor: Colors.primary800,
        elevation: 2,
        shadowColor: 'black',
        shadowOpacity: 0.15,
        shadowOffset: { width: 1, height: 1 },
        shadowRadius: 2,
    },
    pressed: {
        opacity: 0.7,
    },
    text: {
        color: Colors.primary50,
        textAlign: 'center',
    }
})