import React, { Component } from "react";

class SearchBox extends Component {
  state = {
    term: "",
  };

  handleChange = (e) => {
    const term = e.target.value;
    this.setState({ term });
    this.props.onSearchTermChange(term);
  };

  handleSubmit(e) {
    e.preventDefault();
    this.props.handleSearch();
  }

  render() {
    const { term } = this.state;

    return (
      <form className="form-inline" onSubmit={(e) => this.handleSubmit(e)}>
        <input
          className="form-control rounded ml-lg-3"
          type="search"
          placeholder="Search..."
          value={term}
          aria-label="Serach"
          onChange={(e) => this.handleChange(e)}
        />
        <button
          className="btn btn-light btn-outline-primary
           rounded-pill ml-sm-2 my-2 my-sm-0"
        >
          <b>
            <i className="fa fa-search"></i> Search
          </b>
        </button>
      </form>
    );
  }
}

export default SearchBox;
