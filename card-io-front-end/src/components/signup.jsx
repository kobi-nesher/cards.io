import React from "react";
import PageHeader from "./common/pageHeader";
import Form from "./common/form";
import Joi from "joi-browser";
import http from "../services/httpService";
import { apiUrl } from "../config.json";
import { toast } from "react-toastify";

import userService from "../services/userService";
import { Redirect } from "react-router-dom";
//import Input from './common/input';

class Signup extends Form {
  state = {
    data: { email: "", name: "", password: "" },
    errors: {},
  };

  schema = {
    email: Joi.string().required().email().label("Email"),
    name: Joi.string().required().min(6).label("Name"),
    password: Joi.string().required().min(2).label("Password"),
  };

  doSubmit = async () => {
    const data = { ...this.state.data };
    data.biz = false;
    try {
      await http.post(`${apiUrl}/users`, data);
      toast("you signup successfully");
      this.props.history.replace("/signin");
    } catch (ex) {
      if (ex.response && ex.response.status === 400) {
        this.setState({ errors: { email: "Email already registered" } });
      }
    }
  };

  render() {
    if (userService.getCurrentUser()) return <Redirect to="/" />;
    return (
      <div className="container">
        <PageHeader titleText="Sign Up" />
        <br />
        <div className="row">
          <div className="col-lg-6">
            <form onSubmit={this.handleSubmit} autoComplete="off" method="POST">
              {this.renderInput("email", "Email", "email")}
              {this.renderInput("password", "Password", "password")}
              {this.renderInput("name", "Name")}
              {this.renderButton("Signup")}
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default Signup;
