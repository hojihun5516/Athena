
import * as React from 'react';

class Chat extends React.Component{
  state={messageContent : null,}
  setMessageContent =(messageContent)=>{
      this.setState({
        messageContent:messageContent,
      });
      console.log(messageContent);


  }
  submit=(e)=>{
    e.preventDefault();
    
  }
render(){
    return(
      <div>
      <h1>채팅창</h1>
      <form onSubmit={this.submit}>
        <input type='text'
        placeholder='메세지를 입력하세요.'
        onChange={e => this.setMessageContent(e.target.value)}
        value={this.state.messageContents}
        />
        <input type='submit' value='메세지 전송'/>
      </form>
      </div>
    );
  }
}
export default Chat;
