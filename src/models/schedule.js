export default (item) => ({
    id: item.id ? item.id : null,
    locationId: item.locationId ? item.locationId : null,
    opensIn: item.opensIn ? item.opensIn : '',
    closesIn: item.closesIn ? item.closesIn : '',
    numberOfTables: item.numberOfTables ? item.numberOfTables : 0,
    createdAt: item.createdAt ? item.createdAt : '',
});