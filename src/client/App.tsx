import * as React from 'react';
import { BrowserRouter as Router, Link ,NavLink, Redirect, Route, RouteComponentProps, Switch } from 'react-router-dom';
import Home from './Home';
import Main from './Main';

class App extends React.Component {

  public render() {
    return (
      <div>
        <Router>
          <Switch>
            <Route exact={true} path="/" component={Home}/>
            <Route exact={true} path="/main" component={Main}/>
          </Switch>
    </Router>

      </div>
    );
  }
}

export default App;
