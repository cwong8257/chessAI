import React, { Component } from 'react';
import { connect } from 'react-redux';

class Login extends Component {
  state = {
    email: '',
    password: '',
  };

  onChange = (e) => {
    const { name, value } = e.target;
    this.setState(() => ({ [name]: value }));
  };

  render() {
    const { email, password } = this.state;

    return (
      <div>Login</div>
    );
  }
}

// const mapDispatchToProps = { loginUser, clearErrors };

export default connect()(Login);
