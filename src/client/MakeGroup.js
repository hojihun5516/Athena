import axios from 'axios';
import React, { Component } from 'react';
import MakeGroupM from './components/MakeGroupM';
import GroupList from './components/GroupList';
import { observer } from 'mobx-react';

const MyComponent = observer(
class MakeGroup extends Component {
  id = 0;
  state = {

    information: [
    ],

  }
  fetchGroupInfo = async (id) => {
    console.log("1번");
    const info = await Promise.all([
      axios({
          method: 'get',
          url: 'http://localhost:8080/groups'
      }).then(response=>{console.log(response)
        this.informationConcat(response);
      }).catch(error=>{console.log(error);})
    ]);
  }
  informationConcat(response){
    let i=0;
    const info = response.data.groups;
    // const {information} = this.state;
    console.log(info.length);
    for(i=0;i<info.length;i++){
      this.setState({
        information:this.state.information.concat([info[i]])
      })
    }
  }

  constructor(props){
    super(props);
    this.fetchGroupInfo(2);
  }
  handleCreate = (data) => {
    const { information } = this.state;
    // this.setState({
    //   information: information.concat({
    //     ...data,
    //     id: this.id++,
    //   })
    // });
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

  render() {

    return (
      <div>
        <MakeGroupM onCreate={this.handleCreate}/>

        <GroupList
          data={this.state.information}

          onUpdate={this.handleUpdate}
        />
      </div>
    );
  }
})

export default MakeGroup;
