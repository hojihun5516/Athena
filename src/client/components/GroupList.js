import React, { Component } from 'react';
import GroupInfo from './GroupInfo';

class GroupList extends Component {
  static defaultProps = {
    data: []
  }

  render() {

    const { data } = this.props;
    const list = data.map(
      info => (<GroupInfo info={info} />)
    );
    return (
      <div>
        {list}
      </div>
    );
  }
}

export default GroupList;
