import React, { Component } from "react";
import PropTypes from "prop-types";
import { withTracker } from "meteor/react-meteor-data";


import PostList from "./PostList";
import PostAdd from "./PostAdd";
import PostFilter from "./PostFilter";
import { Posts } from "../api/posts";

var titulo =".*.*";
//var titulo =".*a.*";
export class App extends Component {
  constructor(props) {
    super(props);

  }

  onRemoveVote(post, song) {
    let postObj = Posts.findOne(post._id);

    if (!postObj) {
      console.err("Post not found!");
      return;
    }

    postObj.voteCount-=1;
    if (postObj.not[song]===undefined) {
      postObj.not[song]=0;
    }
    postObj.not[song]-=1;

    Posts.update(postObj._id,
      postObj);
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

  onDelete(post, song) {
    let postObj = Posts.findOne(post._id);

    Posts.remove(postObj._id);
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
        Love:0
      },
      not:{
        Not:0
      },
      delete:{
        Delete:""
      }
    });
  }
  onFilter(text)
  {  
    var str1 = ".*"+text+".*";
    titulo = str1;
  }


  render() {    
    return (
      <div className="App">
          <h2>Music Vote</h2>
          <p>This is a web page for you to vote for your favorite song! Or add your favorite one.</p>
          <p>This will show the first 10 songs according to the number of votes!</p>
          <p>Let's play!</p>
          <PostList
              posts={this.props.posts}
              onVote={this.onVote.bind(this)}
              onRemoveVote={this.onRemoveVote.bind(this)}
              onDelete={this.onDelete.bind(this)}
          >
          </PostList>
          <br/>
          <div className ="row">
            <div className="col-sm-6">
              <PostAdd
                onAdd={this.onAdd.bind(this)}
              >
              </PostAdd>
            </div>
            <div className="col-sm-6">
              <PostFilter
              onFilter={this.onFilter.bind(this)}
            >
            </PostFilter>
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
      posts: Posts.find({"text" : {$regex : titulo}}, {limit: 10,sort: {voteCount:-1}}).fetch()
    };
  }
)(App);

