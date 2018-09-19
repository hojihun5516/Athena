import React,{Fragment} from 'react'

class BoardInfo extends React.Component {

  state={
    contents:'',
    key : '',
    title : '',
  }

  render () {

    const {title,contents,key}=this.props.info;
    const style={
      border:'1px solid black',
      margin : '9px',
      padding: '9px',
    };


    return(
      <div style={style}>
      {

          <Fragment>
          <h2>{title}</h2>
          </Fragment>

      }
      </div>
    );
  }
}

export default BoardInfo;
