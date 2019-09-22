import React      from 'react';
import PropTypes  from 'prop-types';
import _          from 'lodash';

import { Select } from '../Controls';
import citiesData from '../../../data/cities.json';

export default class CitySelect extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      citiesOptions: [],
      isLoading:     false,
    };
  }

  componentDidMount() {
    setTimeout(this.handleCitiesDataFetch, 2000);
    this.setState({ isLoading: true });
  }

  handleCitiesDataFetch = () => {
    const formattedCities = _.map(
      citiesData,
      (city) => ({ ...city, population: Number(city.population) }),
    );
    const morePopulatedCities = _.filter(formattedCities, ({ population }) => population > 50000);
    const mostPopulatedCity = _.maxBy(morePopulatedCities, 'population');
    const sortedCities = [
      mostPopulatedCity,
      ..._.sortBy(_.without(morePopulatedCities, mostPopulatedCity), 'city'),
    ];

    const citiesOptions = _.map(sortedCities, ({ city }) => ({ label: city, value: city }));

    this.setState({ citiesOptions, isLoading: false });
  };

  render() {
    const { currentCity, onChange } = this.props;
    const { citiesOptions, isLoading } = this.state;

    const currentOption = _.find(citiesOptions, { value: currentCity });

    return (
      <Select
        className="form-control__control"
        name="city"
        options={citiesOptions}
        value={currentOption}
        onChange={onChange}
        isLoading={isLoading}
        isDisabled={isLoading || _.isEmpty(citiesOptions)}
      />
    );
  }
}

CitySelect.propTypes = {
  currentCity: PropTypes.string.isRequired,
  onChange:    PropTypes.func.isRequired,
};
