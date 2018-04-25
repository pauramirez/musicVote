import React, { Component } from "react";
import PropTypes from "prop-types";

import Post from "./Post";
import Video from "./Video";

export default class PostList extends Component {
  constructor(props) {
    super(props);

    this.state={

    };
  }

  renderPosts() {
    return this.props.posts.map((p,i) =>
      <Post
        onVote={this.props.onVote}
        onDelete={this.props.onDelete}
        onRemoveVote={this.props.onRemoveVote}
        key={i}
        post={p}>
      </Post>
      // <Video></Video>
    );
  }
  render() {
    return (
      <div className="PostList">
     
        <h2>Songs: 🎤🎧</h2>        
        <h3>You voted for: </h3>
          {this.renderPosts()}
         
      </div>
    );
  }
}

PostList.propTypes = {
  posts: PropTypes.array.isRequired,
  onVote: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired
};