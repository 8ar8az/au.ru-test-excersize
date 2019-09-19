import React              from 'react';

import AppHeader          from './AppHeader';
import UserDataChangeForm from './UserDataChangeForm';

const App = () => (
  <div className="app">
    <AppHeader className="app__header" />
    <UserDataChangeForm />
  </div>
);

export default App;
