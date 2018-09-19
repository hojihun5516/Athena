import axios from 'axios';
import React, { Component } from 'react';
import Modal from "react-responsive-modal";
import { observable } from 'mobx';

class MakeGroupM extends Component {
  input = React.createRef();
  state = {
    @observable
    name: '',
    open : false,
  }

    onOpenModal = () => {
      this.setState({ open: true });
    };

    onCloseModal = () => {
      this.setState({ open: false });
    };
  handleSubmit = (e) => {
    // 페이지 새로고침방지
    e.preventDefault();
    //state값을 App.js의 handleCreate에 보내준다

    axios.post('/groups',{
      name: this.state.name
    })
    .then(function success(response){
      console.log("success");
      console.log(response.data);

    }).catch(function b(error){
      console.log("error");
      console.log(error);
    })
    this.setState({
      name : '',
    })
    this.onCloseModal();
    this.props.onCreate(this.state);
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
      <button onClick={this.onOpenModal}>그룹만들기</button>
      <Modal open={open} onClose={this.onCloseModal} center>
        그룹이름입니다<br></br>
        <form onSubmit={this.handleSubmit}>
          <input
            name="name"
            placeholder="그룹이름 입니다"
            onChange={this.handleChange}
            value={this.state.name}
            ref={this.input}
          />
          <button type="submit">등록</button>
        </form>
      </Modal>

      </div>
    );
  }
}

export default MakeGroupM;
