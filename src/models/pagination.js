export default (item) => ({
    currentPage: item.currentPage ? item.currentPage : 1,
    offset: item.nextOffset ? item.nextOffset : 0,
    nextPage: item.nextPage ? item.nextPage : 1,
    total: item.total ? item.total : 0,
    limit: item.limit ? item.limit : 2
});