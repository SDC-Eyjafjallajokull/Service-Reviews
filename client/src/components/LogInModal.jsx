import React from 'react';
import Modal from 'react-modal';



export default class LogInModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modalIsOpen: false,
    }
    this.openModal = this.openModal.bind(this);
  }

  openModal(e) {
    e.preventDefault();
    this.setState({
      modalIsOpen: !this.state.modalIsOpen
    });
  }

  render() {
    return (
      <div className='login-modal'>
        <Modal isOpen={this.state.modalIsOpen} onRequestClose={this.openModal} shouldCloseOnOverlayClick='true'>
            <div className='login'>
              <div className='bullseye'></div>
              <p className='login-text'>Sign into your Target account</p>
              <form className='login-info'>
                <input className='login-user' placeholder='Email or mobile phone'></input>
                <input className='login-password' placeholder='Password'></input>
              </form>
              <button className='login-button-signIn'>Sign in</button>
              <p className='login-forgotPassword'>Forgot password?</p>
              <button className='login-button-account'>Create your Target account</button>
            </div>
        </Modal>
        <button onClick={this.openModal} className='write-button'>Write a review</button>
      </div>
    )
  }
}