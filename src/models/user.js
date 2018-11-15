export default (item) => ({
    id: item.id ? item.id : null,
    email: item.email ? item.email : '',
    firstName: item.firstName ? item.firstName : '',
    lastName: item.lastName ? item.lastName : '',
    barName: item.barName ? item.barName : '',
    phone: item.phone ? item.phone : '',
    isBar: item.isBar ? item.isBar : false,
    createdAt: item.createdAt ? item.createdAt : '',
    updatedAt: item.updatedAt ? item.updatedAt : '',
});