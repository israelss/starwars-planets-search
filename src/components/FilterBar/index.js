import React, { useContext } from 'react';
import { PlanetsContext } from '../../context/PlanetsContext';
import ClearFilterButton from './ClearFilterButton';
import NameFilter from './NameFilter';
import ValueFilter from './ValueFilter';

const FilterBar = () => {
  const { activeFilters } = useContext(PlanetsContext);

  return (
    <div>
      <NameFilter />
      <ValueFilter />
      {
        activeFilters.map((filter) => (
          <ClearFilterButton key={ filter.column } filter={ filter } />
        ))
      }
    </div>
  );
};

export default FilterBar;
