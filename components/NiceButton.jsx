import { View, Text, Pressable, StyleSheet } from 'react-native';

function NiceButton(props) {
    // Define styles that depend on props inside the component
    const dynamicStyles = {
        backgroundColor: props.backgroundColor || 'red',
    };

    return (
        <View style={styles.buttonContainer}>
            <Pressable onPress={props.onPress} style={({ pressed }) => [styles.button, dynamicStyles, { opacity: pressed ? 0.75 : 1 }]}>
                {props.children ? props.children : <Text style={styles.buttonText}>{props.title}</Text>}
            </Pressable>
        </View>
    );
}

const styles = StyleSheet.create({
    button: {
        padding: 10,
        borderRadius: 5,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 10,
        elevation: 5,
        shadowColor: 'black',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 6
    },
    buttonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
    },
});

export default NiceButton;