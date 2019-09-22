import React      from 'react';
import PropTypes  from 'prop-types';
import _          from 'lodash';
import validator  from 'validator';
import dateFormat from 'date-fns/format';
import { ru }     from 'date-fns/locale';

import { FormControl, ValidationInput, Checkbox } from '../Controls';
import CitySelect from './CitySelect';

const cityFieldId          = 'city-field';
const passwordFieldId      = 'password-field';
const retryPasswordFieldId = 'retry-password-field';
const emailFieldId         = 'email-field';
const agreeFieldId         = 'agree-field';

const validators = [
  {
    fieldName: 'password',
    validate: ({ password }) => (validator.isEmpty(password) ? { password: 'Укажите пароль' } : {}),
  },
  {
    fieldName: 'password',
    validate: ({ password }) => (password.length < 5 ? { password: 'Используйте не менее 5 символов' } : {}),
  },
  {
    fieldName: 'retryPassword',
    validate: ({ retryPassword }) => (validator.isEmpty(retryPassword) ? { retryPassword: 'Укажите пароль' } : {}),
  },
  {
    fieldName: 'retryPassword',
    validate: ({ retryPassword, password }) => (retryPassword !== password ? { retryPassword: 'Пароли не совпадают' } : {}),
  },
  {
    fieldName: 'email',
    validate: ({ email }) => (validator.isEmpty(email) ? { email: 'Укажите E-mail' } : {}),
  },
  {
    fieldName: 'email',
    validate: ({ email }) => (validator.isEmail(email) ? {} : { email: 'Неверный E-mail' }),
  },
];

const defaultFormValues = {
  city:          '',
  password:      '',
  retryPassword: '',
  email:         '',
  agree:         false,
};

export default class UserDataForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      values:           defaultFormValues,
      validationErrors: {},
      lastChangeDate:   null,
    };
  }

  handleFormControlsChange = ({ target }) => {
    const { values } = this.state;
    const { name } = target;
    const value = target.type === 'checkbox' ? target.checked : target.value;

    this.setState({ values: { ...values, [name]: value } });
  };

  handleCitySelectChange = ({ value }) => {
    const { values } = this.state;

    this.setState({ values: { ...values, city: value } });
  };

  handleSubmitForm = (event) => {
    event.preventDefault();

    const validationErrors = this.validateFormValues();

    if (!_.isEmpty(validationErrors)) {
      this.setState({ validationErrors });
      return;
    }

    const { values } = this.state;

    // eslint-disable-next-line no-console
    console.log(JSON.stringify(values));

    this.setState({
      values:           defaultFormValues,
      validationErrors: {},
      lastChangeDate:   new Date(),
    });
  };

  validateFormValues = () => {
    const { values } = this.state;

    return _.reduce(
      validators,
      (errors, { fieldName, validate }) => {
        if (_.has(errors, fieldName)) {
          return errors;
        }

        return { ...errors, ...validate(values) };
      },
      {},
    );
  };

  renderChangeDate = () => {
    const { lastChangeDate } = this.state;

    if (!lastChangeDate) {
      return null;
    }

    return dateFormat(lastChangeDate, 'последние изменения d MMMM yyyy в kk:mm:ss', { locale: ru });
  };

  render() {
    const { className } = this.props;
    const {
      values: {
        city,
        password,
        retryPassword,
        email,
        agree,
      },
      validationErrors: {
        password:      passwordInvalidMessage,
        retryPassword: retryPasswordInvalidMessage,
        email:         emailInvalidMessage,
      },
    } = this.state;

    return (
      <form className={`user-data-form ${className}`} onSubmit={this.handleSubmitForm}>
        <fieldset className="user-data-form__group-controls" name="city">
          <FormControl
            className="user-data-form__form-control"
            label="Ваш город"
            labelFor={cityFieldId}
          >
            <CitySelect
              currentCity={city}
              onChange={this.handleCitySelectChange}
            />
          </FormControl>
        </fieldset>
        <fieldset className="user-data-form__group-controls" name="password">
          <FormControl
            className="user-data-form__form-control"
            label="Пароль"
            hint="Ваш новый пароль должен содержать не менее 5 символов"
            labelFor={passwordFieldId}
          >
            <ValidationInput
              id={passwordFieldId}
              className="form-control__control"
              name="password"
              type="password"
              value={password}
              onChange={this.handleFormControlsChange}
              invalidMessage={passwordInvalidMessage}
            />
          </FormControl>
          <FormControl
            className="user-data-form__form-control"
            label="Пароль еще раз"
            hint="Повторите пароль, пожалуйста, это обезопасит Вас с нами на случай ошибки"
            labelFor={retryPasswordFieldId}
          >
            <ValidationInput
              id={retryPasswordFieldId}
              className="form-control__control"
              name="retryPassword"
              type="password"
              value={retryPassword}
              onChange={this.handleFormControlsChange}
              invalidMessage={retryPasswordInvalidMessage}
            />
          </FormControl>
        </fieldset>
        <fieldset className="user-data-form__group-controls" name="email-submit">
          <FormControl
            className="user-data-form__form-control"
            label="Электронная почта"
            hint="Можно изменить адрес, указанный при регистрации"
            labelFor={emailFieldId}
          >
            <ValidationInput
              id={emailFieldId}
              className="form-control__control"
              name="email"
              type="text"
              value={email}
              onChange={this.handleFormControlsChange}
              invalidMessage={emailInvalidMessage}
            />
          </FormControl>
          <FormControl
            className="user-data-form__form-control"
            label="Я согласен"
            labelFor={agreeFieldId}
          >
            <Checkbox
              id={agreeFieldId}
              name="agree"
              title="принимать актуальную информацию на e-mail"
              checked={agree}
              onChange={this.handleFormControlsChange}
            />
          </FormControl>
          <FormControl
            className="user-data-form__form-control"
            hint={this.renderChangeDate()}
            hintClass="user-data-form__last-change-hint"
          >
            <button type="submit" className="button user-data-form__submit-button">Изменить</button>
          </FormControl>
        </fieldset>
      </form>
    );
  }
}

UserDataForm.propTypes = {
  className: PropTypes.string,
};

UserDataForm.defaultProps = {
  className: '',
};
