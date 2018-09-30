import * as React from 'react';
import { BrowserRouter as Router, Link ,NavLink, Redirect, Route, RouteComponentProps, Switch } from 'react-router-dom';
import Board from './components/Board';
import Chat from './components/Chat';

const notFound= ()=>{
  return(
    <h1>이것은 404</h1>
  );
};
const info = ()=>{
  return(
    <h1>그룹에 대한 정보 입니다</h1>
  );
};

const admin = ()=>{
  const isAdmin = false;
  return isAdmin
  ? <h3>Admin입니다</h3>
  : <Redirect to ="/"/>;

};


class ActivePage extends React.Component{
  public render(){
    return(
      <div>

        <Switch>
        <Route exact={true} path="/main" component={info}/>
        <Route exact={true} path="/board" component={Board}/>
        <Route exact={true} path="/chat" component={Chat}/>
        <Route path="/admin" component={admin}/>
        <Route component={notFound}/>
      </Switch>

    </div>


    );

  }
}
export default ActivePage;
