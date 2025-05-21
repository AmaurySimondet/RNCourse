import PlacesList from '../components/places/PlacesList';
import { useIsFocused } from '@react-navigation/native';
import { useEffect } from 'react';
import { useState } from 'react';
import { fetchPlaces } from '../utils/database';

function AllPlaces({ route }) {
    const isFocused = useIsFocused();

    const [loadedPlaces, setLoadedPlaces] = useState([]);

    useEffect(() => {
        console.log("AllPlaces screen is focused");
        async function loadPlaces() {
            const places = await fetchPlaces();
            console.log("Places loaded:", places);
            setLoadedPlaces(places);
        }

        if (isFocused) {
            loadPlaces();
        }
    }, [isFocused]);

    return (
        <PlacesList places={loadedPlaces} />
    )
}

export default AllPlaces;