import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import ResumePage from './pages/ResumePage';
import HomePage from './pages/HomePage';
import ErrorPage from './pages/ErrorPage';

function App() {
  return (
    <>
      <Router>
        <Switch>
          <Route path='/resume/:username' component={ResumePage} />
          <Route path='/cv/:username' component={ResumePage} />
          <Route path='/home' component={HomePage} />
          <Route path='/' component={HomePage} />
          <Route path='*' component={ErrorPage} />
        </Switch>
      </Router>
    </>
  );
}

export default App;
