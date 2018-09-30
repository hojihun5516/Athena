import * as React from 'react';
import { BrowserRouter as Router, Link ,NavLink, Redirect, Route, RouteComponentProps, Switch } from 'react-router-dom';
import Intro from './components/Intro';


class Home extends React.Component {

  public render() {
    return (
      <div>
        <h1>이것은 홈입니다</h1>
        <div>
          <Intro />
        </div>
      </div>
    );
  }
}

export default Home;
