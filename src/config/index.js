export default {
    version: 'v1',
    url: process.env.NODE_ENV === 'production' ? 'xxx' : `http://localhost:4500/api/`,
    google: {
        API_KEY:'xxx',
        GOOGLE_API: 'https://maps.google.com/maps/api/geocode/json'
    }
}