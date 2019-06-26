import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import { logoutUser } from '../../actions/authActions';

class Header extends React.Component {
  state = {}

  render() {
    const { username, logoutUser } = this.props;

    return (
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <Link className="navbar-brand" to="/">ChessAI</Link>
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon" />
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav mr-auto">
            <li className="nav-item active">
              <Link className="nav-link" to="/">Home</Link>
            </li>
          </ul>
          <ul className="navbar-nav">
            <li className="nav-item active">
              {username
                ? <button type="button" onClick={logoutUser}>{username}</button>
                : <Link className="nav-link" to="/login">Sign in</Link>
              }
            </li>
          </ul>
        </div>
      </nav>
    );
  }
}

const mapStateToProps = ({ user }) => ({
  username: user.username
});
const mapDispatchToProps = { logoutUser };


export default connect(mapStateToProps, mapDispatchToProps)(Header);
