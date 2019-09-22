import React     from 'react';
import PropTypes from 'prop-types';
import _         from 'lodash';
import cn        from 'classnames';

const ValidationInput = ({
  className,
  inputClass,
  id,
  name,
  type,
  value,
  invalidMessage,
  onChange,
}) => (
  <div className={`validation-input ${className}`}>
    <input
      className={cn(
        `input validation-input__input ${inputClass}`,
        { 'validation-input__input_invalid': !!invalidMessage },
      )}
      id={id}
      type={type}
      name={name}
      value={value}
      onChange={onChange}
    />
    <div className="validation-input__invalid-message">{invalidMessage}</div>
  </div>
);

ValidationInput.propTypes = {
  id:             PropTypes.string.isRequired,
  name:           PropTypes.string.isRequired,
  type:           PropTypes.string.isRequired,
  className:      PropTypes.string,
  inputClass:     PropTypes.string,
  value:          PropTypes.string,
  invalidMessage: PropTypes.string,
  onChange:       PropTypes.func,
};

ValidationInput.defaultProps = {
  className:      '',
  inputClass:     '',
  value:          '',
  invalidMessage: '',
  onChange:       _.noop,
};


export default ValidationInput;
