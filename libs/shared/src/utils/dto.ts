import _ from 'lodash';

export const convertQueryDtoToFilter = (
  query: any,
  mappingField: Record<string, string>,
  mappingOrderByValueToFilter: any,
  mappingSearchByValueToFilter?: any
): Record<string, any> => {
  const dataQuery = { ...query };
  if (mappingField) {
    Object.keys(mappingField).forEach((key) => {
      _.set(dataQuery, mappingField[key], query[key]);
      const parentArr = mappingField[key].split('.');
      parentArr.pop();
      const parent = parentArr.join('.');
      if (query.limit) {
        _.set(dataQuery, parent + '.limit', query.limit);
      }
      if (query.page) {
        _.set(dataQuery, parent + '.page', query.page);
      }
      delete dataQuery[key];
    });
  }

  if (mappingOrderByValueToFilter) {
    Object.keys(mappingOrderByValueToFilter).forEach((orderByValue) => {
      if (query.order_by == orderByValue) {
        _.set(
          dataQuery,
          mappingOrderByValueToFilter[orderByValue] + '.order_by',
          query.order_by
        );
        _.set(
          dataQuery,
          mappingOrderByValueToFilter[orderByValue] + '.sort_by',
          query.sort_by
        );
        if (query.limit) {
          _.set(
            dataQuery,
            mappingOrderByValueToFilter[orderByValue] + '.limit',
            query.limit
          );
        }
        if (query.page) {
          _.set(
            dataQuery,
            mappingOrderByValueToFilter[orderByValue] + '.page',
            query.page
          );
        }
        delete dataQuery.order_by;
        delete dataQuery.sort_by;
      }
    });
  }

  if (mappingSearchByValueToFilter) {
    let setSearchQuery = new Set(query.search_by);
    Object.keys(mappingSearchByValueToFilter).forEach((searchByValue) => {
      let searchBy = new Set();
      for (const newSearchQuery of mappingSearchByValueToFilter[
        searchByValue
      ]) {
        if (setSearchQuery.has(newSearchQuery)) {
          setSearchQuery.delete(newSearchQuery);
          searchBy.add(newSearchQuery);
        }
      }
      if (searchBy.size) {
        _.set(dataQuery, searchByValue + '.search_by', Array.from(searchBy));
        _.set(dataQuery, searchByValue + '.search_text', query.search_text);
      }
    });
    if (setSearchQuery.size) {
      dataQuery.search_by = Array.from(setSearchQuery);
    } else {
      delete dataQuery.search_by;
      delete dataQuery.search_text;
    }
  }

  return dataQuery;
};
