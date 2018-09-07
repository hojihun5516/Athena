import React, { Component } from 'react';
import MakeGroupM from './components/MakeGroupM';
import GroupList from './components/GroupList';

class MakeGroup extends Component {
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
}

export default MakeGroup;
