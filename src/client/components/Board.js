import axios from 'axios';
import * as React from 'react';
import * as service from '../services/posts';
import WritingBoard from './WritingBoard';
import BoardList from './BoardList';
import { BrowserRouter as Router, Link ,NavLink, Redirect, Route, RouteComponentProps, Switch } from 'react-router-dom';



class Board extends React.Component{
  state = {
    id : 0,
    information: [

    ],

  }
  componentWillMount(){

      console.log("componentWillMount");
      this.fetchBoardInfo(5);

  }

  fetchBoardInfo = async (id) => {
    console.log("1번");
    const info = await Promise.all([
      service.getTitle(id),
      service.getContent(id)
    ]);
    console.log("2번");
    const {information} = this.state;
    this.setState(prevState => ({
      information: information.concat({
        content : info[0].data.content,
        title: info[0].data.title,
      })
    }))
    console.log(content);
    console.log(id);
    console.log(title);
  }

  componentDidMount(){
    console.log("componentDidMount");
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
