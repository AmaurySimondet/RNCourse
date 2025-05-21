import { View, Text, TextInput, ScrollView, StyleSheet } from 'react-native';
import { useState } from 'react';
import { Colors } from '../../constants/colors';
import ImagePicker from './ImagePicker';
import LocationPicker from './LocationPicker';
import RegularButton from '../../UI/RegularButton';
import { useCallback } from 'react';
import Place from '../../models/place';

function PlaceForm({ onCreatePlace }) {
    const [enteredTitle, setEnteredTitle] = useState('');
    const [pickedLocation, setPickedLocation] = useState();
    const [selectedImage, setSelectedImage] = useState();

    function titleInputHandler(enteredText) {
        setEnteredTitle(enteredText);
    }

    function imageTakenHandler(imageUri) {
        setSelectedImage(imageUri);
    }

    const locationPickedHandler = useCallback((location) => {
        console.log(location);
        setPickedLocation(location);
    }, []);

    function savePlaceHandler() {
        const placeData = new Place(null, enteredTitle, selectedImage, pickedLocation);
        onCreatePlace(placeData);
    }

    return (
        <ScrollView>
            <View>
                <Text style={styles.label}>Title</Text>
                <TextInput style={styles.input} value={enteredTitle} onChangeText={titleInputHandler} />
                <ImagePicker onImageTaken={imageTakenHandler} />
                <LocationPicker onLocationPicked={locationPickedHandler} />
                <RegularButton onPress={savePlaceHandler}>Add Place</RegularButton>
            </View>
        </ScrollView>
    )
}

export default PlaceForm;

const styles = StyleSheet.create({
    form: {
        flex: 1,
        padding: 24,
    },
    label: {
        fontWeight: 'bold',
        marginBottom: 4,
        color: Colors.primary500,
    },
    input: {
        marginVertical: 8,
        paddingHorizontal: 4,
        paddingVertical: 8,
        fontSize: 16,
        borderBottomColor: Colors.primary700,
        borderBottomWidth: 2,
        backgroundColor: Colors.primary100,
    }
})