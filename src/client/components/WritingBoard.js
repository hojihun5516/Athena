<<<<<<< HEAD
=======

>>>>>>> 237e4d44a1601080335eaa425802a1b42a3b0c94
import axios from 'axios';
import React, { Component } from 'react';

class WritingBoard extends Component {
  input = React.createRef();
  state = {
    contents: '',
    title: '',
  }

    handleSubmit = (e) => {
      // 페이지 새로고침방지
      e.preventDefault();
      //state값을 App.js의 handleCreate에 보내준다

      this.props.onCreate(this.state);
<<<<<<< HEAD
=======
      axios.post('/boards',{
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
        title : '',
      })

>>>>>>> 237e4d44a1601080335eaa425802a1b42a3b0c94
    }

    handleChange = (e) => {
      this.setState({
        [e.target.name]: e.target.value
      });
    }


  render() {
      const { open } = this.state;
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
