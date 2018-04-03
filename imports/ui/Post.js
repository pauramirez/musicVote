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

  renderRemoveVotes() {
    let res=[];
    for (let song in this.props.post.not) {
      res.push(
        <button
          onClick={() =>
            this.props.onRemoveVote(
              this.props.post,
              song
            )}
          key={song}>{song} {this.props.post.not[song]}</button>
      );
    }
    return res;
  }

  renderDelete() {
    let res=[];
    for (let song in this.props.post.delete) {
      res.push(
        <button
          onClick={() =>
            this.props.onDelete(
              this.props.post,
              song
            )}
          key={song}>{song} {this.props.post.delete[song]}</button>
      );
    }
    return res;
  }

  render() {
    return (
        <div className="Post">
        <div className ="row">
          <div className="col-sm-6">
            <div><h5>{this.props.post.text}</h5></div>
            <div>By: {this.props.post.artist}</div>
            <div>Voted {this.props.post.voteCount} times</div>
          </div>
          <div className="col-sm-6">
            <div>Find it at: <a href={this.props.post.url}>Video</a></div>
            {this.renderVotes()}
            {this.renderRemoveVotes()}
            {this.renderDelete()}
          </div>
        </div>
        <br/>
      </div>
    );
  }
}

Post.propTypes = {
  post: PropTypes.object.isRequired,
  onVote: PropTypes.func.isRequired
};