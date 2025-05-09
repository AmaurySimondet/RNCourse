import { Pressable, Image, Text, View, StyleSheet } from 'react-native';

function PlaceItem({ place, onSelect }) {
    return (
        <Pressable style={styles.placeItem} onPress={onSelect}>
            <Image source={{ uri: place.imageUri }} />
            <View>
                <Text>{place.title}</Text>
                <Text>{place.address}</Text>
            </View>
        </Pressable>
    )
}

export default PlaceItem;

const styles = StyleSheet.create({
    placeItem: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        padding: 12,
    }
})