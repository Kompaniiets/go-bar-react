export default {
    version: 'v1',
    url: process.env.NODE_ENV === 'production' ? 'http://ec2-35-171-166-44.compute-1.amazonaws.com/api/' : `http://localhost:4500/api/`,
    google: {
        API_KEY:'AIzaSyAbDDLYtgs_rWiB63Z-htH_vVAcOkIkoaI',
        GOOGLE_API: 'https://maps.google.com/maps/api/geocode/json'
    }
}