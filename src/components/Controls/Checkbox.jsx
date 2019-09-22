import React     from 'react';
import PropTypes from 'prop-types';
import _         from 'lodash';

const Checkbox = ({
  id,
  title,
  className,
  checked,
  name,
  onChange,
}) => (
  <div className={`checkbox ${className}`}>
    <input id={id} className="checkbox__input" type="checkbox" checked={checked} name={name} onChange={onChange} />
    <label className="checkbox__label" htmlFor={id}>
      <div className="checkbox__fake-input">
        {checked && <i className="material-icons checkbox__done-icon">done</i>}
      </div>
      {title}
    </label>
  </div>
);

Checkbox.propTypes = {
  id:        PropTypes.string.isRequired,
  name:      PropTypes.string.isRequired,
  title:     PropTypes.string,
  className: PropTypes.string,
  checked:   PropTypes.bool,
  onChange:  PropTypes.func,
};

Checkbox.defaultProps = {
  title:     '',
  className: '',
  checked:   false,
  onChange:  _.noop,
};

export default Checkbox;
