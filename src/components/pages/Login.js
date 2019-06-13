import React, { Component } from 'react';
import { connect } from 'react-redux';

import { loginUser } from '../../actions/authActions';

class Login extends Component {
  state = {
    email: '',
    password: ''
  };

  handleOnChange = (e) => {
    const { name, value } = e.target;
    this.setState(() => ({ [name]: value }));
  };

  handleSubmitForm = async (e) => {
    e.preventDefault();

    const { email, password } = this.state;
    const { loginUser, authorization, history } = this.props;

    await loginUser({ email, password });
    history.push('/game');
  }

  render() {
    const { email, password } = this.state;

    return (
      <div>
        <form onSubmit={this.handleSubmitForm}>
          <div className="form-group">
            <label htmlFor="email">
              Email address
              <input type="email" className="form-control" id="email" name="email" value={email} onChange={this.handleOnChange} />
            </label>
          </div>
          <div className="form-group">
            <label htmlFor="password">
              Password
              <input type="password" className="form-control" id="password" name="password" value={password} onChange={this.handleOnChange} />
            </label>
          </div>
          <button type="submit" className="btn btn-primary">Sign in</button>
        </form>
      </div>
    );
  }
}

const mapStateToProps = ({ authorization }) => ({
  authorization
});
const mapDispatchToProps = { loginUser };

export default connect(mapStateToProps, mapDispatchToProps)(Login);
