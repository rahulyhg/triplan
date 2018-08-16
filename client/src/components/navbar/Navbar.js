import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { withAuth } from '@okta/okta-react';

export default withAuth(
  class Navbar extends Component {
    constructor(props) {
      super(props);
      this.state = { authenticated: null };
      this.checkAuthentication();
      this.currentUserName = '';
    }

    checkAuthentication = async () => {
      const authenticated = await this.props.auth.isAuthenticated();
      if (authenticated !== this.state.authenticated) {
        this.setState({ authenticated });
      }
    }

    componentDidUpdate() {
      this.checkAuthentication();
    }

    checklogin = () => {
      if (this.state.authenticated === null) return null;
      const idToken = JSON.parse(localStorage.getItem('okta-token-storage'));
      if (Object.keys(idToken).length) {
        this.currentUserName = idToken.idToken.claims.name;
      }
      const authNav = this.state.authenticated ? (
        <ul className="auth-nav nav navbar-nav navbar-right">
          <li className="disabled mr-3">{this.currentUserName}</li>
          <li className="nav-item"><Link to="/Login"><button className="btn btn-sm btn-outline-secondary my-2 my-sm-0" type="button" onClick={() => this.props.auth.logout()}>Log Out</button></Link></li>
        </ul>
      ) : (
        <ul className="auth-nav nav navbar-nav navbar-right">
          <li className="nav-item mr-3"><Link to="/Login"><button className="btn btn-sm btn-outline-secondary my-2 my-sm-0" type="button" onClick={() => this.props.auth.login()}>Log In</button></Link></li>
          <li className="nav-item"><Link to="/Register"><button className="btn btn-sm btn-outline-secondary my-2 my-sm-0" type="button">Register</button></Link></li>
        </ul>
      );
      return authNav;
    }

    render() {
      return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light mb-3">
          <span className="navbar-brand"><Link className="navbar-brand" to="/">Triplan</Link></span>
          <button
            className="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#navbarNav">
            <span className="navbar-toggler-icon" />
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav mr-auto">
              <li className="nav-item">
                <Link className="nav-link" to="/">Home</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/MyTrips">My Trips</Link>
              </li>
            </ul>
            {this.checklogin()}
          </div>
        </nav >
      );
    }
  }
);


