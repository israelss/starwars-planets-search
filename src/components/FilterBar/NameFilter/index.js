import React, { useContext } from 'react';
import { PlanetsContext } from '../../../context/PlanetsContext';

const NameFilter = () => {
  const { setNameFilter } = useContext(PlanetsContext);

  return (
    <div>
      <label htmlFor="nameFilter">
        Search Planet:
        <input
          data-testid="name-filter"
          type="text"
          name="nameFilter"
          id="nameFilter"
          onChange={ ({ target: { value } }) => setNameFilter(value) }
        />
      </label>
    </div>
  );
};

export default NameFilter;
