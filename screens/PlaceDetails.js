import { useEffect, useLayoutEffect } from "react";
import { Image, ScrollView, Text, View, StyleSheet } from "react-native";
import OutlineButton from "../UI/OutlineButton";
import { Colors } from "../constants/colors";
import { fetchPlaceDetails } from "../utils/database";
import { useState } from "react";

function PlaceDetails({ route, navigation }) {
    const [selectedPlace, setSelectedPlace] = useState(null);

    function showOnMapHandler() {
        navigation.navigate('Map', {
            initialLat: selectedPlace.location.latitude,
            initialLng: selectedPlace.location.longitude
        });
    }

    useEffect(() => {
        async function loadPlaceData() {
            const place = await fetchPlaceDetails(route.params.placeId);
            setSelectedPlace(place);
            navigation.setOptions({
                title: place.title
            });
        }
        loadPlaceData();
    }, [route.params.placeId]);

    if (!selectedPlace) {
        return <View style={styles.fallback}>
            <Text>Loading...</Text>
        </View>
    }

    return (
        <ScrollView>
            <Image style={styles.image} source={{ uri: selectedPlace.imageUri }} />
            <View style={styles.locationContainer}>
                <View style={styles.addressContainer}>
                    <Text style={styles.address}>{selectedPlace.address}</Text>
                </View>
                <OutlineButton icon="map" onPress={showOnMapHandler}>
                    View on Map
                </OutlineButton>
            </View>
        </ScrollView>
    );
}

export default PlaceDetails;

const styles = StyleSheet.create({
    image: {
        height: 200,
        minHeight: 300,
        width: '100%',
    },
    locationContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',  // Add this
        padding: 20,    // Add this
    },
    addressContainer: {
        padding: 20,
        width: '100%',  // Add this
    },
    address: {
        color: Colors.primary500,
        textAlign: 'center',
        fontWeight: 'bold',
        fontSize: 16,
    },
    fallback: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    }
});