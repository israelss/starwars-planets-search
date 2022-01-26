import React, { createContext, useEffect, useReducer, useState } from 'react';
import PropTypes from 'prop-types';
import { fetchPlanetsData } from '../services';

export const PlanetsContext = createContext();

const INITIAL_FILTERS = {
  filterByName: {
    name: '',
  },
  filterByNumericValues: [],
  order: {
    column: 'population',
    sort: 'ASC',
  },
};

const INITIAL_OPTIONS = [
  'population',
  'orbital_period',
  'diameter',
  'rotation_period',
  'surface_water',
];

const comparisons = {
  'igual a': (a, b) => Number(a) === Number(b),
  'maior que': (a, b) => Number(a) > Number(b),
  'menor que': (a, b) => Number(a) < Number(b),
};

export const PlanetsProvider = ({ children }) => {
  const [tableData, setTableData] = useState([]);
  const [filters, setFilters] = useState(INITIAL_FILTERS);
  const [nameFilter, setNameFilter] = useState('');
  const [valueFilter, setValueFilter] = useState([]);
  const [valueFilterOptions, setValueFilterOptions] = useState(INITIAL_OPTIONS);

  const filterActions = {
    init: (payload) => [...payload]
      .sort((a, b) => a.name.charCodeAt(0) - b.name.charCodeAt(0)),
    sort: (payload) => [...payload],
    name: (payload) => {
      setValueFilterOptions(INITIAL_OPTIONS);
      setFilters({
        ...filters,
        filterByName: {
          name: payload,
        },
      });
      return payload.length > 0
        ? tableData.filter(({ name }) => name
          .toLowerCase()
          .includes(payload.toLowerCase()))
        : tableData;
    },
    values: () => {
      const [newColumn, newComparison, newValue] = valueFilter;
      setValueFilter([]);
      setValueFilterOptions([
        ...valueFilterOptions
          .filter((option) => option !== newColumn),
      ]);

      const newNumericFilters = [...filters.filterByNumericValues];
      newNumericFilters.filter(({ column }) => column !== newColumn);
      if (newColumn) {
        newNumericFilters.push({
          column: newColumn,
          comparison: newComparison,
          value: newValue,
        });
      }
      setFilters({
        ...filters,
        filterByNumericValues: [...newNumericFilters],
      });
      if (newNumericFilters.length > 0) {
        let filteredData = [...tableData];
        newNumericFilters.forEach(({ column, comparison, value }) => {
          filteredData = tableData
            .filter((planet) => comparisons[comparison](planet[column], value));
        });
        return filteredData;
      }
      return tableData;
    },
    removeValue: (removedColumn) => {
      setValueFilterOptions(Array.from(new Set([
        ...valueFilterOptions,
        removedColumn,
      ])));
      let newNumericFilters = [...filters.filterByNumericValues];
      newNumericFilters = newNumericFilters
        .filter(({ column }) => column !== removedColumn);
      setFilters({
        ...filters,
        filterByNumericValues: [...newNumericFilters],
      });
      if (newNumericFilters.length > 0) {
        let filteredData = [...tableData];
        newNumericFilters.forEach(({ column, comparison, value }) => {
          filteredData = tableData
            .filter((planet) => comparisons[comparison](planet[column], value));
        });
        return filteredData;
      }
      return tableData;
    },
  };

  const filterReducer = (_, [type, payload]) => filterActions[type](payload);

  const [filteredTableData, dispatch] = useReducer(filterReducer, []);

  const fetchTableData = async () => {
    const data = await fetchPlanetsData();
    setTableData(data);
    dispatch(['init', data]);
  };

  useEffect(() => {
    fetchTableData();
  }, []);

  useEffect(() => {
    dispatch(['name', nameFilter]);
  }, [nameFilter]);

  useEffect(() => {
    dispatch(['values']);
  }, [valueFilter.length]);

  const removeFilter = (column) => {
    dispatch(['removeValue', column]);
  };

  const sort = ([column, order]) => {
    const sortedTableData = [...filteredTableData];

    sortedTableData.sort((a, b) => {
      const sortOrder = a[column] - b[column];
      if (order === 'ASC') return sortOrder;
      return -sortOrder;
    });

    dispatch(['sort', sortedTableData]);
  };

  const context = {
    activeFilters: filters.filterByNumericValues,
    filteredTableData,
    removeFilter,
    setNameFilter,
    setValueFilter,
    sort,
    valueFilterOptions,
  };

  return (
    <PlanetsContext.Provider value={ context }>
      { children }
    </PlanetsContext.Provider>
  );
};

PlanetsProvider.propTypes = {
  chidlren: PropTypes.node,
}.isRequired;
