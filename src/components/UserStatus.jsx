import React     from 'react';
import PropTypes from 'prop-types';
import _         from 'lodash';

const UserStatus = ({
  className,
  editable,
  status,
  onStatusChange,
  inputRef,
}) => (
  <div className={`tooltip user-status ${className}`}>
    {
      editable
        ? (
          <input
            type="text"
            className="input user-status__input"
            value={status}
            onChange={onStatusChange}
            ref={inputRef}
          />
        ) : <div>{status || '***Ваш статус пока пуст***'}</div>
    }
  </div>
);

UserStatus.propTypes = {
  className:      PropTypes.string,
  editable:       PropTypes.bool,
  status:         PropTypes.string,
  onStatusChange: PropTypes.func,
  inputRef:       PropTypes.shape({
    current: PropTypes.instanceOf(Element),
  }),
};

UserStatus.defaultProps = {
  className:      '',
  editable:       false,
  status:         '',
  onStatusChange: _.noop,
  inputRef:       { current: null },
};

export default UserStatus;
