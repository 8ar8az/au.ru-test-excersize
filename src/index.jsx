import 'normalize.css';
import './styles/main.scss';

import React    from 'react';
import ReactDOM from 'react-dom';

import App      from './components';

const init = () => {
  ReactDOM.render(
    <App />,
    document.getElementById('root'),
  );
};

init();
