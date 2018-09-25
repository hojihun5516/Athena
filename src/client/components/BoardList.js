import React, { Component } from 'react';
import BoardInfo from './BoardInfo';

class BoardList extends Component {
  static defaultProps = {
    data: []
  }

  render() {

    const { data } = this.props;
    const list = data.map(
      info => (<BoardInfo  info={info}/>)
    );
    return (
      <div>
        {}
        {list}
      </div>
    );
  }
}

export default BoardList;
