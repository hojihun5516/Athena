
import * as React from 'react';

import WritingBoard from './WritingBoard';
import BoardList from './BoardList';
import { BrowserRouter as Router, Link ,NavLink, Redirect, Route, RouteComponentProps, Switch } from 'react-router-dom';


class Board extends React.Component{
  id = 0;
  state = {

    information: [
      {contents:'', title:''}
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
  //   axios.post('/boards',{
  //     contents : this.state.information[1],
  //     title : 'tittit',
  //   })
  //   .then(function success(response){
  //     console.log("success");
  //     console.log(response.data);
  //
  //   }).catch(function b(error){
  //     console.log("error");
  //     console.log(error);
  //   })
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
