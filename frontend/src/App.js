import React, { Component } from 'react';
import Login from './components/login/Login';
import Signup from './components/signup/Signup';
import Main from './components/main/Main'
import NotFound from './components/not-found/NotFound';
import PrivateRoute from './components/private-route/PrivateRoute';
import { BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import './styles/foundation.min.css';
import './styles/custom.css';


class App extends Component {
  render() {
    return (
      <Router>
          <Switch>
            <PrivateRoute exact path="/" component={Main} />
            <PrivateRoute exact path="/profile" component={Main} />
            <PrivateRoute exact path="/community" component={Main} />
            <PrivateRoute exact path="/search" component={Main} />
            <Route exact path='/login' component={Login} />
            <Route exact path='/signup' component={Signup} />
            <Route exact path='/*' component={NotFound} />
          </Switch>
      </Router>
    );
  }
}

export default App;