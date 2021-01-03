import React, { Component } from "react";
import { NavLink } from "react-router-dom";

class Navbar extends Component {
  state = {};
  render() {
    const { user } = this.props;
    return (
      <nav className="navbar navbar-expand-lg navbar-light bg-light shadow-sm">
        <div className="container">
          <NavLink className="navbar-brand" to="/">
            Cards.io
          </NavLink>
          <button
            className="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav mr-auto">
              {user && (
                <React.Fragment>
                  <li className="nav-item">
                    <NavLink className="nav-link" to="/browse-cards">
                      Browse Cards
                    </NavLink>
                  </li>
                  <li className="nav-item">
                    <NavLink className="nav-link" to="/saved-cards">
                      Saved Cards
                    </NavLink>
                  </li>
                </React.Fragment>
              )}
            </ul>

            <ul className="navbar-nav ml-auto">
              {!user && (
                <React.Fragment>
                  <li className="nav-item">
                    <NavLink className="nav-link" to="/signin">
                      Signin
                    </NavLink>
                  </li>
                  <li className="nav-item">
                    <NavLink className="nav-link" to="/signup">
                      Singup
                    </NavLink>
                  </li>
                  <li className="nav-item">
                    <NavLink className="nav-link" to="/bizSignup">
                      <b>Business</b>
                    </NavLink>
                  </li>
                </React.Fragment>
              )}
              {user && user.biz && (
                <li className="nav-item">
                  <NavLink className="nav-link" to="/my-cards">
                    My Cards
                  </NavLink>
                </li>
              )}

              {user && (
                <li className="nav-item">
                  <NavLink className="nav-link" to="/logout">
                    Logout
                  </NavLink>
                </li>
              )}
            </ul>
          </div>
        </div>
      </nav>
    );
  }
}

export default Navbar;
