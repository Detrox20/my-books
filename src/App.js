import React from 'react';
import './App.css';
import { BrowserRouter, Switch } from 'react-router-dom';
import { ErrorBoundary } from 'react-error-boundary';
import { Route } from 'react-router-dom';
import FatalError from './pages/FatalError';
import Signin from './pages/Signin';
import Home from './pages/Home';
import NotFound from './pages/NotFound';

export default function App() {
  return (
    <ErrorBoundary FallbackComponent={FatalError}>
      <BrowserRouter>
        <Switch>
          <Route path="/signin" component={Signin} />
          <Route path="/" component={Home} />
          <Route component={NotFound} />
        </Switch>
      </BrowserRouter>
    </ErrorBoundary>
  );
}
