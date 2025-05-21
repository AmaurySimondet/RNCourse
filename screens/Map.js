import MapView, { Marker } from "react-native-maps";
import { StyleSheet } from "react-native";
import { useState, useLayoutEffect, useCallback } from "react";
import { useNavigation } from "@react-navigation/native";
import IconButton from "../UI/IconButtons";

function Map({ route }) {
    const navigation = useNavigation();
    const initialLocation = route.params?.initialLat && route.params?.initialLng && {
        latitude: route.params.initialLat,
        longitude: route.params.initialLng,
        latitudeDelta: 0.01,
        longitudeDelta: 0.01
    }

    const region = {
        latitude: initialLocation ? initialLocation.latitude : 37.7749,
        longitude: initialLocation ? initialLocation.longitude : -122.4194,
        latitudeDelta: 0.01,
        longitudeDelta: 0.01
    }

    const [selectedLocation, setSelectedLocation] = useState(initialLocation);

    function selectLocationHandler(event) {
        const lat = event.nativeEvent.coordinate.latitude;
        const lng = event.nativeEvent.coordinate.longitude;
        setSelectedLocation({ lat: lat, lng: lng });
    }

    const savePickedLocationHandler = useCallback(() => {
        if (!selectedLocation) {
            Alert.alert('No location picked!');
            return;
        }
        navigation.navigate('AddPlace', { pickedLocation: selectedLocation });
    }, [navigation, selectedLocation]);

    useLayoutEffect(() => {
        if (initialLocation) {
            return;
        }
        navigation.setOptions({
            headerRight: ({ tintColor }) => <IconButton icon="save" size={24} color={tintColor} onPress={savePickedLocationHandler} />
        })
    }, [navigation, savePickedLocationHandler, initialLocation]);

    return (
        <MapView style={styles.map} initialRegion={region} onPress={selectLocationHandler}>
            {selectedLocation &&
                <Marker title="Place" coordinate={{ latitude: selectedLocation.lat, longitude: selectedLocation.lng }} />}
        </MapView>
    )
}

export default Map;

const styles = StyleSheet.create({
    map: {
        flex: 1
    }
})