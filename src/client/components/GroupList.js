import React, { Component } from 'react';
import GroupInfo from './GroupInfo';

class GroupList extends Component {
  static defaultProps = {
    data: []
  }

  render() {

    const { data , onUpdate} = this.props;
    const list = data.map(
      info => (<GroupInfo onUpdate={onUpdate} info={info} key={info.id} />)
    );
    return (
      <div>
        {list}
      </div>
    );
  }
}

export default GroupList;
