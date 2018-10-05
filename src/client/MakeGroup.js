import axios from 'axios';
import React, { Component } from 'react';
import MakeGroupM from './components/MakeGroupM';
import GroupList from './components/GroupList';
import {observable} from 'mobx';
import {observer} from 'mobx-react';

class GroupSelect extends Component{
  @observable
  name = '';
}

const store = new GroupSelect();

@observer
class MakeGroup extends Component {

  @observable
  nana='';
  state = {
    a: 1,
    information: [

    ],
    name1:'',
  }

  fetchGroupInfo = async () => {
    console.log("fetchGroupInfo");
    const info = await Promise.all([
      axios({
          method: 'get',
          url: 'http://localhost:8080/groups'
      }).then(response=>{console.log(response)
        this.informationConcat(response);
      }).catch(error=>{console.log(error);})
    ]);
  }

  handleCreate = () => {
    console.log("handle");
    this.fetchGroupInfo();
  }

  onClick = (nam) => {
    const { name1 } = this.state;
    store.name = nam;
    // this.nana=nam;
    // this.setState({
    //   name1: nam,
    // });
    console.log(nam);
  }

  informationConcat(response){
    let abc=[];
    let i=0;
    const info = response.data.groups;
    console.log(info.length);
    for(i=0;i<info.length;i++){
      abc=abc.concat([info[i]])
    }
    this.setState({
      information:abc
    })

  }
  componentWillReact(){
    console.log("componentWillReact");

  }

  constructor(props){
    super(props);
    console.log("constructor");
  }

  componentWillMount(){
      console.log("componentWillMount");
      this.fetchGroupInfo();

  }
  render() {
    console.log("MakeGroupRender");
    return (
      <div>
        <MakeGroupM onCreate={this.handleCreate}/>
        <GroupList
          data={this.state.information}
          onClick={this.onClick}
        />
      </div>
    );
  }
}

export default MakeGroup;
