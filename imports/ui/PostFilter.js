import React, { Component } from "react";
import PropTypes from "prop-types";

export default class PostFilter extends Component {
  constructor(props) {
    super(props);

    this.state={

    };
  }
  render() {
    return (
      <div className="PostFilter">
        <p>Find your song <br/><input
          type="text"
          placeholder="Find"
          ref="text"/></p>
        <button
          onClick={
            () =>
              this.props.onFilter(this.refs.text.value)
          }
        >Find
        </button>
      </div>
    );
  }
}

PostFilter.propTypes = {
  onFilter:PropTypes.func.isRequired
};