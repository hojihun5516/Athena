
import * as React from 'react';
import axios from 'axios';
import WritingBoard from './WritingBoard';
import BoardList from './BoardList';
import { BrowserRouter as Router, Link ,NavLink, Redirect, Route, RouteComponentProps, Switch } from 'react-router-dom';



class Board extends React.Component{

  state = {
    information: [

    ],

  }

  constructor(props) {
          super(props);
          console.log("constructor");
          this.fetchBoardInfo(2);

  }

informationConcat(response){
  let i=0;
  const info = response.data.boards;
  // const {information} = this.state;
  console.log(info.length);
  for(i=0;i<info.length;i++){
    this.setState({
      information:this.state.information.concat([info[i]])
    })
  }
}
  componentWillMount(){
      console.log("componentWillMount");
  }
//Promise.all 메소드를 하용하여([자바스크립트] 비동기프로그래밍, ES6(ECMA Script 6) - Promise로 콜백지옥 해결하기 참고) getTitle과 getContent가 모두 실행 됩니다.
//async/await를 사용하여 비동기 작업을 동기 작업인 것처럼 코딩을 가능하도록 합니다. async는 비동기 작업을 하도록 하고, await는 비동기 작업인 Promise를 기다립니다.
//출처: http://beomy.tistory.com/36 [beomy]
  fetchBoardInfo = async (id) => {
    console.log("1번");
    const info = await Promise.all([
      axios({
          method: 'get',
          url: 'http://localhost:8080/groups/'+id+'/boards'
      }).then(response=>{console.log(response)
        this.informationConcat(response);
      }).catch(error=>{console.log(error);})
    ]);
  }

  componentDidMount(){
    console.log("componentDidMount");
}

  handleCreate = (data) => {
    const { information } = this.state;
    this.setState({
      information: information.concat({
        ...data,
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
