export default {
    version: 'v1',
    url: process.env.NODE_ENV === 'production' ? '' : `http://localhost:4500/api/`,
    google: {
        API_KEY:'AIzaSyAbDDLYtgs_rWiB63Z-htH_vVAcOkIkoaI',
        GOOGLE_API: 'https://maps.google.com/maps/api/geocode/json'
    }
}