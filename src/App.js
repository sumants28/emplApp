import React from 'react';
import './App.css';
import Dashboard from './Dashboard/Dashboard';
import Auth from './Auth/Auth';
import { Route, Switch, Redirect, withRouter } from 'react-router-dom';
import Error from './hoc/withError';
import { connect } from 'react-redux';

class App extends React.Component {
  render() {
    let routes = null;
    if(this.props.isLoggedIn) {
      routes = (
        <Switch>
          <Error>
            <Route path = "/" exact component = {Dashboard} />
            <Redirect to = "/"/>
          </Error>  
        </Switch>
      )
    } else {
      routes = (
        <Switch>
          <Error>
            <Route path = "/auth" exact component = {Auth} />
            <Redirect to = "/auth"/>
          </Error>
        </Switch>
      )
    }
    return (
      <main className="App">
        {routes}
      </main>
    );
  }
}

const mapStateToProps = state => {
  return {
    isLoggedIn:state.auth.isLoggedIn
  }  
}

export default withRouter(connect(mapStateToProps,null)(App));
