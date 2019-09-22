import React         from 'react';

import AppHeader     from './AppHeader';
import UserDataForm  from './UserDataForm';

const App = () => (
  <div className="app">
    <AppHeader className="app__header" />
    <UserDataForm />
  </div>
);

export default App;
