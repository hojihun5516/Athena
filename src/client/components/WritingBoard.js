
import axios from 'axios';
import React, { Component } from 'react';
import { observable } from 'mobx';

class CounterContainer {
  @observable count = 1;
}
const store = new CounterContainer();

class WritingBoard extends Component {
  // input = React.createRef();
  state = {
    contents: '',
    title: '',
  }

    handleSubmit = (e) => {
      // 페이지 새로고침방지
      e.preventDefault();
      //state값을 App.js의 handleCreate에 보내준다

      this.props.onCreate(this.state);
      axios.post('/groups/2/boards',{
        contents : this.state.contents,
        title : this.state.title,
      })
      .then(function success(response){
        console.log("success");
        console.log(response.data);

      }).catch(function b(error){
        console.log("error");
        console.log(error);
      })
      this.setState({
        contents: '',
        count: this.count++,
        title : '',
      })

    }

    handleChange = (e) => {
      this.setState({
        [e.target.name]: e.target.value
      });

    }


  render() {
      
    return (
      <div>

        <form onSubmit={this.handleSubmit}>
          <h1>Athena</h1>
          <input
            autoFocus
            className="w-100 pa2 mv2 br2 b--black-20 bw1"
            name="title"
            onChange={this.handleChange}
            value={this.state.title}
            placeholder="Title"
            type="text"

          /><br></br>
          <textarea
            className="db w-100 ba bw1 b--black-20 pa2 br2 mb2"
            cols={50}
            name="contents"
            name="contents"
            onChange={this.handleChange}
            value={this.state.contents}
            placeholder="Content"
            rows={8}

          />
        <button type="submit">글작성</button>
        </form>



      </div>
    );
  }
}

export default WritingBoard;
