import React, { useContext, useEffect, useState } from 'react';
import { PlanetsContext } from '../../../context/PlanetsContext';
import Select from '../../Select';

const ValueFilter = () => {
  const { setValueFilter, valueFilterOptions } = useContext(PlanetsContext);
  const [filter, setFilter] = useState({
    column: 'population',
    comparison: 'maior que',
    value: 0,
  });

  useEffect(() => {
    setFilter({
      column: valueFilterOptions[0],
      comparison: 'maior que',
      value: 0,
    });
  }, [valueFilterOptions]);

  const handleChange = ({ target: { name, value } }) => setFilter({
    ...filter,
    [name]: value,
  });

  const handleFilter = () => setValueFilter([
    filter.column,
    filter.comparison,
    filter.value,
  ]);

  return (
    <div>
      <Select
        id="column"
        label="Column: "
        onChange={ handleChange }
        testId="column-filter"
      >
        {
          valueFilterOptions.map((option) => (
            <option
              key={ option }
              value={ option }
            >
              { option }
            </option>
          ))
        }
      </Select>
      <Select
        id="comparison"
        label="Comparison: "
        onChange={ handleChange }
        testId="comparison-filter"
      >
        <option value="maior que">maior que</option>
        <option value="menor que">menor que</option>
        <option value="igual a">igual a</option>
      </Select>
      <input
        data-testid="value-filter"
        id="value"
        name="value"
        defaultValue={ 0 }
        onChange={ handleChange }
        type="number"
      />
      <button
        data-testid="button-filter"
        onClick={ handleFilter }
        type="button"
      >
        Filter
      </button>
    </div>
  );
};

export default ValueFilter;
