import React, { Component } from "react";
import "./App.css";
import Navbar from "./components/navbar";
import Footer from "./components/footer";
import Home from "./components/home";
import Signup from "./components/signup";
import Signin from "./components/signin";
import Logout from "./components/logout";
import { Switch, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import userService from "./services/userService";
import BizSignup from "./components/bizSignup";
import CreateCard from "./components/createCard";
import ProtectedRoute from "./components/common/protectedRoute";
import MyCards from "./components/myCards";
import BrowseCards from "./components/browseCards";
import EditCard from "./components/editCard";
import SavedCards from "./components/savedCards";

class App extends Component {
  state = {};

  componentDidMount() {
    const user = userService.getCurrentUser();
    this.setState({ user });
  }

  render() {
    const { user } = this.state;
    return (
      <React.Fragment>
        <header>
          <ToastContainer />
          <Navbar user={user} />
        </header>
        <main className="minh900">
          <Switch>
            <ProtectedRoute
              path="/my-cards/edit/:id"
              component={EditCard}
              biz={true}
            />
            <ProtectedRoute
              path="/create-card"
              component={CreateCard}
              biz={true}
            />
            <ProtectedRoute
              path="/saved-cards"
              component={SavedCards}
              biz={false}
            />
            <ProtectedRoute
              path="/browse-cards/:term"
              component={BrowseCards}
              biz={false}
            />
            <ProtectedRoute
              path="/browse-cards"
              exact
              component={BrowseCards}
              biz={false}
            />
            <ProtectedRoute path="/my-cards" component={MyCards} biz={true} />
            <Route path="/bizSignup" component={BizSignup} />
            <Route path="/about" component={Home} />
            <Route path="/" exact component={Home} />
            <Route path="/signup" component={Signup} />
            <Route path="/signin" component={Signin} />
            <Route path="/logout" component={Logout} />
          </Switch>
        </main>
        <footer>
          <Footer />
        </footer>
      </React.Fragment>
    );
  }
}

export default App;
