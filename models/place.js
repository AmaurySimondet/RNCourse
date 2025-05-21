class Place {
    constructor(id, title, imageUri, location) {
        this.id = id;
        this.title = title;
        this.imageUri = imageUri;
        this.location = { latitude: location.latitude, longitude: location.longitude, address: location.address };
    }
}

export default Place;