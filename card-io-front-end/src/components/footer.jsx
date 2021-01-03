import React, { Component } from "react";

class Footer extends Component {
  state = {};
  render() {
    return (
      <p className="border-top pt-3 text-center">
        Cards.io &copy; {new Date().getFullYear()}
      </p>
    );
  }
}

export default Footer;
