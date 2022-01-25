import React, { createContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { fetchPlanetsData } from '../services';

export const PlanetsContext = createContext();

export const PlanetsProvider = ({ children }) => {
  const [tableData, setTableData] = useState([]);
  const [tableHeaderData, setTableHeaderData] = useState([]);

  const fetchTableData = async () => {
    const data = await fetchPlanetsData();
    const headerData = Object
      .keys(data.at(0))
      .map((column) => ({ [column]: column }));
    setTableHeaderData(headerData);
    setTableData(data);
  };

  useEffect(() => {
    fetchTableData();
  }, []);

  return (
    <PlanetsContext.Provider value={ { tableData, tableHeaderData } }>
      { children }
    </PlanetsContext.Provider>
  );
};

PlanetsProvider.propTypes = {
  chidlren: PropTypes.node,
}.isRequired;
