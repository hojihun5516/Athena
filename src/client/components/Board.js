import axios from 'axios';
import * as React from 'react';
import WritingBoard from './WritingBoard';
import BoardList from './BoardList';
import { BrowserRouter as Router, Link ,NavLink, Redirect, Route, RouteComponentProps, Switch } from 'react-router-dom';


class Board extends React.Component{
  id = 0;
  state = {

    information: [

    ],

  }


  handleCreate = (data) => {
    const { information } = this.state;
    this.setState({
      information: information.concat({
        ...data,
        id: this.id++,
      })
    });
  }

  handleUpdate = (id, data) => {
    const { information } = this.state;
    this.setState({
      information: information.map(
        info => {
          if (info.id === id) {
            return {
              id,
              ...data,
            };
          }
          return info;
        }
      )
    });
  }
   render(){
    return(
      <div>
      <Router>
      <div>
      <li><NavLink activeStyle={{fontSize:24}} to="/writing_board"> 글작성 </NavLink></li>
        <Switch>

        <Route exact={true} path="/writing_board"  render={()=><WritingBoard onCreate={this.handleCreate.bind(this)}/>}/>
      </Switch>
      </div>
      </Router>
        <BoardList
          data={this.state.information}
          onUpdate={this.handleUpdate}
        />
      </div>
    );
  }
}
export default Board;
