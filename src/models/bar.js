export default (item) => ({
    id: item.id ? item.id : null,
    userId: item.userId ? item.userId : null,
    title: item.title ? item.title : '',
    info: item.info ? item.info : '',
    lat: item.lat ? item.lat : null,
    lng: item.lng ? item.lng : null,
    createdAt: item.createdAt ? item.createdAt : '',
});