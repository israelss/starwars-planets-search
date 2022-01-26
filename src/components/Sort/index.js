import React, { useContext, useState } from 'react';
import { PlanetsContext } from '../../context/PlanetsContext';
import Select from '../Select';

const Sort = () => {
  const [sortColumn, setSortColumn] = useState('population');
  const [sortOrder, setSortOrder] = useState('ASC');

  const { sort } = useContext(PlanetsContext);

  const handleSort = () => {
    sort([sortColumn, sortOrder]);
  };

  return (
    <div>
      <Select
        id="column-sort"
        label="Sort by: "
        onChange={ ({ target: { value } }) => setSortColumn(value) }
        testId="column-sort"
      >
        <option value="population">population</option>
        <option value="orbital_period">orbital_period</option>
        <option value="diameter">diameter</option>
        <option value="rotation_period">rotation_period</option>
        <option value="surface_water">surface_water</option>
      </Select>
      ASC
      <input
        data-testid="column-sort-input-asc"
        type="radio"
        name="sort-order"
        id="ASC"
        value="ASC"
        onChange={ ({ target: { value } }) => setSortOrder(value) }
      />
      DESC
      <input
        data-testid="column-sort-input-desc"
        type="radio"
        name="sort-order"
        id="DESC"
        value="DESC"
        onChange={ ({ target: { value } }) => setSortOrder(value) }
      />
      <button
        data-testid="column-sort-button"
        type="button"
        onClick={ handleSort }
      >
        Sort
      </button>
    </div>
  );
};

export default Sort;
