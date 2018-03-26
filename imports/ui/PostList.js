import React, { Component } from "react";
import PropTypes from "prop-types";

import Post from "./Post";

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
        key={i}
        post={p}>
      </Post>
    );
  }
  render() {
    return (
      <div className="PostList">
        <h2>Posts:</h2>
        {this.renderPosts()}
      </div>
    );
  }
}

PostList.propTypes = {
  posts: PropTypes.array.isRequired,
  onVote: PropTypes.func.isRequired
};