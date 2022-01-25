import React, { createContext, useEffect, useReducer, useState } from 'react';
import PropTypes from 'prop-types';
import { fetchPlanetsData } from '../services';

export const PlanetsContext = createContext();

const INITIAL_FILTERS = {
  filterByName: {
    name: '',
  },
};

export const PlanetsProvider = ({ children }) => {
  const [tableData, setTableData] = useState([]);
  const [filters, setFilters] = useState(INITIAL_FILTERS);

  const filterActions = {
    init: (payload) => [...payload],
    name: (payload) => {
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
  };
  const filterReducer = (_, [type, payload]) => filterActions[type](payload);

  const [filteredTableData, dispatch] = useReducer(filterReducer, []);
  const [nameFilter, setNameFilter] = useState('');

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

  const context = {
    filteredTableData,
    setNameFilter,
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
