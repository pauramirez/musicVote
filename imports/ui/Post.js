import React, { Component } from "react";
import PropTypes from "prop-types";

export default class Post extends Component {
  constructor(props) {
    super(props);

    this.state={

    };
  }

  renderVotes() {
    let res=[];
    for (let song in this.props.post.votes) {
      res.push(
        <button
          onClick={() =>
            this.props.onVote(
              this.props.post,
              song
            )}
          key={song}>{song} {this.props.post.votes[song]}</button>
      );
    }
    return res;
  }


  render() {
    return (
      <div className="Post">
      <h3>Canciones votadas</h3>
        <div>{this.props.post.text}</div>
        {this.renderVotes()}
      </div>
    );
  }
}

Post.propTypes = {
  post: PropTypes.object.isRequired,
  onVote: PropTypes.func.isRequired
};