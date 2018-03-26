import React, { Component } from "react";
import PropTypes from "prop-types";
import { withTracker } from "meteor/react-meteor-data";


import PostList from "./PostList";
import PostAdd from "./PostAdd";
import { Posts } from "../api/posts";


export class App extends Component {
  constructor(props) {
    super(props);

  }


  onVote(post, emoji) {
    let postObj = Posts.findOne(post._id);

    if (!postObj) {
      console.err("Post not found!");
      return;
    }

    postObj.voteCount+=1;
    if (postObj.votes[emoji]===undefined) {
      postObj.votes[emoji]=0;
    }
    postObj.votes[emoji]+=1;

    Posts.update(postObj._id,
      postObj);
  }

  onAdd(text) {
    if (!text) return;
    Posts.insert({
      text,
      voteCount:0,
      votes:{
        "🤡":0,
        "😡":0,
        "😇":0,
        "🏊":0
      }
    });

  }


  render() {
    return (
      <div className="App">
        <h1>Music Vote</h1>

        <PostList
          posts={this.props.posts}
          onVote={this.onVote.bind(this)}
          >
        </PostList>
        <PostAdd
          onAdd={this.onAdd.bind(this)}
          >
        </PostAdd>
      </div>
    );
  }
}

App.propTypes = {
  posts: PropTypes.array.isRequired
};

export default withTracker(
  () => {
    return {
      posts: Posts.find({}, {sort: {voteCount:-1}}).fetch()
    };
  }
)(App);