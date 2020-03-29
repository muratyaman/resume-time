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
          <Route path='/cv/:file' component={ResumePage} />
          <Route path='/' component={HomePage} />
          <Route path='*' component={ErrorPage} />
        </Switch>
      </Router>
    </>
  );
}

export default App;
