import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { PlanetsContext } from '../../../context/PlanetsContext';

const ClearFilterButton = ({ filter: { column, comparison, value } }) => {
  const { removeFilter } = useContext(PlanetsContext);

  return (
    <div data-testid="filter">
      { `${column} ${comparison} ${value}` }
      <button
        onClick={ () => removeFilter(column) }
        type="button"
      >
        X
      </button>
    </div>
  );
};

ClearFilterButton.propTypes = {
  filterName: PropTypes.string,
}.isRequired;

export default ClearFilterButton;
