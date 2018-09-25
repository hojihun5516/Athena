import axios from 'axios';
import React, { Component } from 'react';
import Modal from "react-responsive-modal";
import {observable} from 'mobx';




class MakeGroupM extends Component {
  // input = React.createRef();

  state = {

    name: '',
    open : false,
  }
    onOpenModal = () => {
      this.setState({ open: true });
    };

    onCloseModal = () => {
      this.setState({ open: false});
    };

    // async함수로 동기화만들고 await 이 함수를 동기화시킴
  handleSubmit = async (e) => {
    // 페이지 새로고침방지
    e.preventDefault();
    //a는 성공여부를 나타냄
    let a = 1;
    await axios.post('/groups',{
      name: this.state.name,
    })
    .then(function success(response){
      console.log("success");
      console.log(response.data);

    }).catch(function (error){
      console.log("error");
      console.log(error);
      a=2;
    })
    this.setState({
      name : '',
    })
    this.onCloseModal();
    if(a===1){
      this.props.onCreate();
    }
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
