import React      from 'react';
import PropTypes  from 'prop-types';

import UserStatus from './UserStatus';

export default class AppHeader extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      userStatus: 'Прежде чем действовать, надо понять',
      isUserStatusEditable: false,
    };
  }

  handleUserStatusButtonClick = () => {
    const { isUserStatusEditable } = this.state;

    this.handleEditModeChange(!isUserStatusEditable);
  };

  handleStatusChange = (event) => {
    this.setState({ userStatus: event.target.value });
  };

  handleEditModeChange = (isUserStatusEditable, callback) => {
    this.setState({ isUserStatusEditable }, callback);
  };

  render() {
    const { className } = this.props;
    const { userStatus, isUserStatusEditable } = this.state;

    return (
      <header className={`header ${className}`}>
        <h1 className="header__greeting">
          Здравствуйте,
          {' '}
          <div className="header__username">
            Человек №3596941
            <UserStatus
              className="header__user-status"
              status={userStatus}
              editable={isUserStatusEditable}
              onStatusChange={this.handleStatusChange}
              onEditModeChange={this.handleEditModeChange}
            />
          </div>
        </h1>
        <button
          type="button"
          className="button button_type_text header__user-status-button"
          onClick={this.handleUserStatusButtonClick}
        >
          {isUserStatusEditable ? 'Сохранить статус' : 'Сменить статус'}
        </button>
      </header>
    );
  }
}

AppHeader.propTypes = {
  className: PropTypes.string,
};

AppHeader.defaultProps = {
  className: '',
};
