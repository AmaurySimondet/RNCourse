import * as SQLite from 'expo-sqlite';
import Place from '../models/place';
const database = SQLite.openDatabaseSync('places.db');

export async function init() {
    try {
        await database.runAsync(`
            CREATE TABLE IF NOT EXISTS places (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                title TEXT,
                imageUri TEXT,
                address TEXT,
                latitude REAL,
                longitude REAL
            )
        `);
    } catch (error) {
        console.error('Error initializing database:', error);
        throw error;
    }
}

export async function insertPlace(placeData) {
    try {
        await database.runAsync(`
            INSERT INTO places (title, imageUri, address, latitude, longitude) VALUES (?, ?, ?, ?, ?)
        `, [placeData.title, placeData.imageUri, placeData.location.address, placeData.location.latitude, placeData.location.longitude]);
    } catch (error) {
        console.error('Error inserting place:', error);
        throw error;
    }
}

export async function fetchPlaces() {
    try {
        const rows = await database.getAllAsync(`
            SELECT * FROM places
        `);
        const places = [];
        if (rows) {
            for (const row of rows) {
                places.push(new Place(row.id, row.title, row.imageUri, {
                    latitude: row.latitude,
                    longitude: row.longitude,
                    address: row.address
                }));
            }
        }
        return places;
    } catch (error) {
        console.error('Error fetching places:', error);
        throw error;
    }
}

export async function fetchPlaceDetails(placeId) {
    try {
        const result = await database.getFirstAsync(`
            SELECT * FROM places WHERE id = ?
        `, [placeId]);
        return result;
    } catch (error) {
        console.error('Error fetching place details:', error);
        throw error;
    }
}

export async function deleteTable() {
    try {
        await database.runAsync(`
            DROP TABLE IF EXISTS places
        `);
    } catch (error) {
        console.error('Error deleting table:', error);
        throw error;
    }
}

export default Place;