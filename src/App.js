import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Header from './components/Header';
import Home from './components/Home';
import Details from './components/Details';
import './App.css';

const routes = [
  {
    path: '/',
    exact: true,
    component: Home,
  },
  {
    path: '/details',
    exact: true,
    component: Details,
  },
];

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Switch>
        {routes.map(route => (
          <Route
            key={route.path}
            path={route.path}
            exact={route.exact}
            component={route.component}
          />
        ))}
      </Switch>
    </BrowserRouter>
  );
}

export default App;
