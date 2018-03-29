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


  onVote(post, song) {
    let postObj = Posts.findOne(post._id);

    if (!postObj) {
      console.err("Post not found!");
      return;
    }

    postObj.voteCount+=1;
    if (postObj.votes[song]===undefined) {
      postObj.votes[song]=0;
    }
    postObj.votes[song]+=1;

    Posts.update(postObj._id,
      postObj);
  }

  onAdd(text,artist,url) {
    if (!text) return;
    Posts.insert({
      text,
      //inclui el artista y url del video
      artist,
      url,
      voteCount:0,
      votes:{
        love:0,
        like:0,
        not:0
      }
    });
  }


  render() {
    return (
      <div className="App">
        <div className="container">
          <h2>Music Vote</h2>
          <p>This is a web page for you to vote for your favorite song! Or add your favorite one.</p>
          <p>This will show the first 10 songs according to the number of votes!</p>
          <p>Let's play!</p>
          <div className="col-sm-6">
            <PostList
              posts={this.props.posts}
              onVote={this.onVote.bind(this)}
            >
            </PostList>
            <br/>
            <PostAdd
              onAdd={this.onAdd.bind(this)}
            >
            <div className="col-sm-6">
          <a href="https://www.youtube.com/results?search_query=">Video</a>
          </div>
          </PostAdd>
          </div>
          </div>
      </div>
    );
  }
}

App.propTypes = {
  posts: PropTypes.array.isRequired
};
//conexión mongo 
export default withTracker(
  () => {
    return {
      //lo limite al top 10 mas votadas
      posts: Posts.find({}, {limit: 10,sort: {voteCount:-1}}).fetch()
    };
  }
)(App);

