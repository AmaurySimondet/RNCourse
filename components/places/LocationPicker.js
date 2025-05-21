import { useState } from 'react';
import { View, Alert, StyleSheet, Image, Text } from 'react-native';
import OutlineButton from '../../UI/OutlineButton';
import { Colors } from '../../constants/colors';
import { getCurrentPositionAsync, PermissionStatus, useForegroundPermissions } from 'expo-location';
import { getMapPreview, getAddress } from '../../utils/location';
import { useNavigation, useRoute, useIsFocused } from '@react-navigation/native';
import { useEffect } from 'react';

function LocationPicker({ onLocationPicked }) {
    const [pickedLocation, setPickedLocation] = useState();
    const [locationPermissionInformation, requestPermission] = useForegroundPermissions();
    const navigation = useNavigation();
    const route = useRoute();
    const isFocused = useIsFocused();

    useEffect(() => {
        const initialLocation = route.params?.pickedLocation;
        if (initialLocation) {
            setPickedLocation({ latitude: initialLocation.lat, longitude: initialLocation.lng });
        }
    }, [route, isFocused]);

    useEffect(() => {

        async function updateLocation() {
            if (pickedLocation) {
                const address = await getAddress(pickedLocation.latitude, pickedLocation.longitude);
                onLocationPicked({ ...pickedLocation, address });
            }
        }

        updateLocation();
    }, [pickedLocation, onLocationPicked]);

    async function verifyPermissions() {
        const result = await requestPermission();
        if (result.status !== PermissionStatus.GRANTED) {
            Alert.alert('Permission to access location was denied.');
            return false;
        }
        return true;
    }
    function pickOnMapHandler() {
        navigation.navigate('Map');
    }

    async function getLocationHandler() {
        const hasPermission = await verifyPermissions();
        if (!hasPermission) {
            return;
        }
        const location = await getCurrentPositionAsync();
        console.log(location);
        setPickedLocation({
            latitude: location.coords.latitude,
            longitude: location.coords.longitude,
        });
    }

    let previewLocation = <Text>No location picked yet.</Text>;
    if (pickedLocation) {
        previewLocation = <Image source={{ uri: getMapPreview(pickedLocation.latitude, pickedLocation.longitude) }} style={styles.mapImage} />;
    }

    return (
        <View>
            <View style={styles.mapPreview}>
                {previewLocation}
            </View>
            <View style={styles.actions}>
                <OutlineButton icon="location" onPress={getLocationHandler}>Locate User</OutlineButton>
                <OutlineButton icon="map" onPress={pickOnMapHandler}>Pick on Map</OutlineButton>
            </View>
        </View >
    );
}

export default LocationPicker;

const styles = StyleSheet.create({
    mapPreview: {
        width: '100%',
        height: 200,
        marginVertical: 8,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: Colors.primary100,
        borderRadius: 4,
    },
    actions: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
    },
    mapImage: {
        width: '100%',
        height: '100%',
        borderRadius: 4,
    },
});