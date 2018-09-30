import * as React from 'react';
import { BrowserRouter as Router, Link ,NavLink, Redirect, Route, RouteComponentProps, Switch } from 'react-router-dom';
import Board from './components/Board';
import Chat from './components/Chat';


class Category extends React.Component{

    public render() {

      return (

          <div>
            <ul>
              <li><NavLink exact={true} activeStyle={{fontSize:24}} to="/main"> group info로 가자 </NavLink></li>
              <li><NavLink exact={true} activeStyle={{fontSize:24}} to="/board"> Board로 가자 </NavLink></li>
              <li><NavLink exact={true} activeStyle={{fontSize:24}} to="/chat"> chat로 가자 </NavLink></li>
            </ul>
          </div>

      );
    }
}
export default Category;
