const GetCurrentLocation  = () => {
    return new Promise((resolve, reject) => {
        const location = window.navigator && window.navigator.geolocation;

        if (location) {
            location.getCurrentPosition((position) => resolve({
                lat: position.coords.latitude,
                lng: position.coords.longitude,
            }), (error) => reject(error))
        }
    });
};

export default GetCurrentLocation;