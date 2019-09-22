import React     from 'react';
import PropTypes from 'prop-types';

const FormControl = ({
  className,
  hintClass,
  label,
  labelFor,
  hint,
  children,
}) => (
  <div className={`form-control ${className}`}>
    <label className="form-control__label" htmlFor={labelFor}>
      {label}
    </label>
    {children}
    <div className={`form-control__hint ${hintClass}`}>{hint}</div>
  </div>
);

FormControl.propTypes = {
  children:     PropTypes.element.isRequired,
  labelFor:     PropTypes.string,
  className:    PropTypes.string,
  hintClass:    PropTypes.string,
  label:        PropTypes.string,
  hint:         PropTypes.string,
};

FormControl.defaultProps = {
  className:    '',
  hintClass:    '',
  label:        '',
  hint:         '',
  labelFor:     '',
};

export default FormControl;
