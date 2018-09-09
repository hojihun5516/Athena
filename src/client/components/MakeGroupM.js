import React, { Component } from 'react';
import Modal from "react-responsive-modal";

class MakeGroupM extends Component {
  input = React.createRef();
  state = {
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
    this.props.onCreate(this.state);
    this.setState({
      name : '',
    })
    this.input.current.focus();
    this.onCloseModal();
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
