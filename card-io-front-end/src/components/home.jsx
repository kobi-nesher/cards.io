import React, { Component } from "react";
import PageHeadr from "./common/pageHeader";
class Home extends Component {
  state = {};
  render() {
    return (
      <div className="container">
        <PageHeadr titleText="About Us" />

        <div className="row">
          <div className="col-12">
            <p>
              In this web-app we created a way for businesses to create their
              online business cards to keep in touch with their costumers.
              <br />
              Cards are created by businesses and can be saved by potential
              constumers.
            </p>
            <p>
              <b style={{ fontSize: "2rem" }}>How it works</b>
              <br />
              Businesses create their digital business cards online.
              <br /> Users can browse for cards created by businesses and save
              their favorite cards.
              <br /> Cards saved can be accessed in the Saved Cards tab.
            </p>
            <p>
              <b style={{ fontSize: "2rem" }}>Businesses</b>
              <ul>
                <li>Create FREE digital business cards</li>
                <li>Potential leads from users searching for cards</li>
                <li>
                  Save other businesses contact information - all in one place
                </li>
              </ul>
            </p>
            <p>
              <b style={{ fontSize: "2rem" }}>Costumers</b>
              <ul>
                <li>Our service is FREE for all users</li>
                <li>Keep in touch with your favorite suppliers</li>
                <li>
                  Organize all your contact information with your favorite
                  businesses in a simple way
                </li>
              </ul>
            </p>
          </div>
        </div>
      </div>
    );
  }
}

export default Home;
