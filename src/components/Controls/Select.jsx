import React                         from 'react';
import PropTypes                     from 'prop-types';
import ReactSelect, { createFilter } from 'react-select';

const filterOptionsConfig = {
  trim: true,
  ignoreCase: true,
  matchFrom: 'start',
};

const Select = ({
  className,
  options,
  value,
  onChange,
  isLoading,
  isDisabled,
  name,
}) => (
  <ReactSelect
    className={`select-input ${className}`}
    classNamePrefix="select-input"
    name={name}
    options={options}
    value={value || null}
    onChange={onChange}
    placeholder="..."
    isLoading={isLoading}
    isDisabled={isDisabled}
    filterOption={createFilter(filterOptionsConfig)}
    noOptionsMessage={() => 'Ничего не найдено'}
  />
);

const valueShape = {
  value: PropTypes.string,
  label: PropTypes.string,
};

Select.propTypes = {
  value:      PropTypes.shape(valueShape).isRequired,
  onChange:   PropTypes.func.isRequired,
  className:  PropTypes.string,
  isLoading:  PropTypes.bool,
  isDisabled: PropTypes.bool,
  name:       PropTypes.string,
  options:    PropTypes.arrayOf(
    PropTypes.shape(valueShape),
  ).isRequired,
};

Select.defaultProps = {
  className:  '',
  isLoading:  false,
  isDisabled: false,
  name:       '',
};

export default Select;
