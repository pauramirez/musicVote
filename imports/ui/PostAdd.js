import React, { Component } from "react";
import PropTypes from "prop-types";

export default class PostAdd extends Component {
  constructor(props) {
    super(props);

    this.state={

    };
  }
  render() {
    return (
      <div className="PostAdd">
        <textarea
          type="text"
          placeholder="Enter your song"
          ref="text"/>
        <button
          onClick={
            () =>
              this.props.onAdd(this.refs.text.value)
          }
        >Add
        </button>
      </div>
    );
  }
}

PostAdd.propTypes = {
  onAdd:PropTypes.func.isRequired
};