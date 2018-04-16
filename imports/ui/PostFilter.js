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
       <hr/>
       <h5>Find your song by...</h5>
        <select>
          <option value default>Select search type</option>
          <option value="SONG">Song</option>
          <option value="ARTIST">Artist</option>
          <option value="LIST">Playlist</option>
        </select> <br/>
        <p>Search
        <br/>
        <input
          className="searchSong"
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



//onChange={(event) => this.handleTypeChange(event)}