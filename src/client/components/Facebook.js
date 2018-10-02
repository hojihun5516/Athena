import * as React from 'react';
import FacebookLogin from 'react-facebook-login';


class Facebook extends React.Component {

  state = {
    email : '',
    isLoggedIn: false,
    name : '',
    picture : '',
    userID: '',
  }
  responseFacebook = response =>{
   console.log(response);
this.setState({
   email : response.email,
   isLoggedIn: true,
   name : response.name,
   picture : response.picture.data.url,
   userID: response.userID,
 });
 }
 componentClicked = ()=> {console.log('clicked');}

 render() {
    let fbContent;

    if(this.state.isLoggedIn){
      fbContent=(
        <div
        style={{
          background: "#00f4f4",
          margin : "auto",
          padding : "20px",
          width : "400px",
        }}>
          <img src={this.state.picture} alt={this.state.name}/>
          <h2>Welcome {this.state.name}</h2>
          <h5>Email: {this.state.email}</h5>
        </div>
      )
    }else{
      fbContent = (<FacebookLogin
        appId="1879705068793535"
        autoLoad={true}
        fields="name,email,picture"
        onClick={this.componentClicked}
        callback={this.responseFacebook} />);
    }

    return (
      <div>
        {fbContent}
      </div>
    );

  }
}

export default Facebook;
