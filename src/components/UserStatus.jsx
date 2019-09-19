import React     from 'react';
import PropTypes from 'prop-types';
import _         from 'lodash';

export default class UserStatus extends React.Component {
  constructor(props) {
    super(props);

    this.inputRef = React.createRef();
  }

  componentDidUpdate(prevProps) {
    const { editable: currentEditable } = this.props;
    const { editable: previousEditable } = prevProps;

    if (currentEditable && !previousEditable) {
      this.inputRef.current.focus();
    }
  }

  handleInputKeyPress = (event) => {
    const { onEditModeChange } = this.props;

    if (event.key === 'Enter') {
      event.preventDefault();

      onEditModeChange(false);
    }
  };

  render() {
    const {
      className,
      editable,
      status,
      onStatusChange,
    } = this.props;

    return (
      <div className={`tooltip user-status ${className}`}>
        {
          editable
            ? (
              <input
                type="text"
                className="input user-status__input"
                value={status}
                onChange={onStatusChange}
                onKeyPress={this.handleInputKeyPress}
                ref={this.inputRef}
              />
            ) : <div>{status || '***Ваш статус пока пуст***'}</div>
        }
      </div>
    );
  }
}

UserStatus.propTypes = {
  className:        PropTypes.string,
  editable:         PropTypes.bool,
  status:           PropTypes.string,
  onStatusChange:   PropTypes.func,
  onEditModeChange: PropTypes.func,
};

UserStatus.defaultProps = {
  className:        '',
  editable:         false,
  status:           '',
  onStatusChange:   _.noop,
  onEditModeChange: _.noop,
};
