import * as React from 'react';
import { BrowserRouter as Router, Link ,NavLink, Redirect, Route, RouteComponentProps, Switch } from 'react-router-dom';
import Facebook from './Facebook';
class Intro extends React.Component {

  render() {
    return (
      <div>
        <h1>안녕하세요 이 페이지는 Athena Intro 페이지입니다</h1>
        <h2>편의를위해 기능 페이지로 가는 버튼입니다 나중에 제거함</h2>
        <Facebook/>
        <h1><NavLink exact={true} to="/main">기능으로 가는버튼</NavLink></h1>
      </div>
    );
  }
}

export default Intro;
