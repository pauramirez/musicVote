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
        <textarea
          type="text"
          placeholder="Find"
          ref="text"/>
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