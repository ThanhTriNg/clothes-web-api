export const generatePaginationAndSortQueries  = ({ page, pageSize, sort, order, key }) => {
    const attributes = key?.length > 0 ? key.split(',') : null;
    const queries = { distinct: true };
    const offset = (page - 1) * pageSize;
    queries.offset = +offset;
    queries.limit = +pageSize;

    if (sort && !order) {
        queries.order = [sort];
    }
    if (sort && order) {
        queries.order = [[sort, order]];
    }
    return { queries, attributes };
};
