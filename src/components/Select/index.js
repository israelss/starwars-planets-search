import React from 'react';
import PropTypes from 'prop-types';

const Select = ({ children, id, label, onChange, testId }) => (
  <label htmlFor={ id }>
    { label }
    <select
      data-testid={ testId }
      id={ id }
      name={ id }
      onChange={ onChange }
    >
      { children }
    </select>
  </label>
);

Select.propTypes = {
  chidlren: PropTypes.node,
}.isRequired;

export default Select;
