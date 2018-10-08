import React,{Fragment} from 'react'

class GroupInfo extends React.Component {


    onClick =() =>{
      const {info, onClick} = this.props;
      onClick(info.name);
    }

  state={
    name : '',
  }

  render () {
    const { name }=this.props.info;
    const style={
      border:'1px solid black',
      margin : '9px',
      padding: '9px',
    };


    return(
      <div style={style}>
      {

          <Fragment>
          <button onClick={this.onClick}>{name}</button>
          </Fragment>

      }
      </div>
    );
  }
}

export default GroupInfo;
