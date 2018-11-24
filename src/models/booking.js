export default (item) => ({
    id: item.id ? item.id : null,
    userId: item.userId ? item.userId : null,
    locationId: item.locationId ? item.locationId : null,
    startAt: item.startAt ? item.startAt : '',
    endAt: item.endAt ? item.endAt : '',
    duration: item.duration ? item.duration : null,
    createdAt: item.createdAt ? item.createdAt : '',
});