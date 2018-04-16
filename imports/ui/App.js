import React, { Component } from "react";
import PropTypes from "prop-types";
import { withTracker } from "meteor/react-meteor-data";

import AccountsUIWrapper from './AccountsUIWrapper';
import { Meteor } from 'meteor/meteor';

import PostList from "./PostList";
import PostAdd from "./PostAdd";
import PostFilter from "./PostFilter";
import { Posts } from "../api/posts";
import NavBar from "./NavBar"

var titulo =".*.*";

var client_id = 'CLIENT_ID'; // Your client id
var client_secret = 'CLIENT_SECRET'; // Your secret
var redirect_uri = 'REDIRECT_URI'; // Your redirect uri


export class App extends Component {


  constructor(props) {
    super(props);

  }

  isUserAdmin(){
    console.log(Meteor.user().username);
    if (Meteor.user().username == "pauramirez" || Meteor.user().roll == "full") {
      return true;
    }
    else if(!isUserActive()){
      return false;
    }
    else return false;
  }

  isUserActive(){
    console.log(Meteor.user().username);
    if (Meteor.user().username == null || Meteor.user() == undefined || Meteor.user() == "") {
      return false;
    }
    else return true;
  }

  onRemoveVote(post, song) {
    if(this.isUserActive()){
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

      //Posts.update(postObj._id, postObj);
      Meteor.call('postsUpdate', postObj._id, postObj);

      window.alert("We've registered you vote!")
    }
    else{window.alert("Not in the game?, Register and play!")}
  }

  onVote(post, song) {
    if(this.isUserActive()){
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

    //Posts.update(postObj._id,postObj);
    Meteor.call('postsUpdate', postObj._id, postObj);

    window.alert("We've registered you vote!")
  }
  else{window.alert("Not in the game?, Register and play!")}
  }


  onDelete(post, song) {
    if(this.isUserAdmin()){
      let postObj = Posts.findOne(post._id);
      //Posts.remove(postObj._id);
      Meteor.call('postsRemove', postObj._id);
      window.alert("Deleted song successfully! 😃")
    }
    else if(!this.isUserActive()){
      window.alert("Not in the game?, Register and play!")
    }
    else{window.alert("You are not admin, sorry! 😔")}
  }

  onAdd(text,artist,url) {
    if(this.isUserActive()){
      if (!text) return;
      Meteor.call('postsInsert',
        text, artist, url
      //Posts.insert(
      // {
      //   text,
      //   artist,
      //   url,
      //   voteCount:0,
      //   votes:{
      //     Love:0
      //   },
      //   not:{
      //     Not:0
      //   },
      //   delete:{
      //     Delete:""
      //   }
      // }
    );
      window.alert("We've added your song! wait to see how many people think the way you do!")
    }
    else{window.alert("Not in the game?, Register and play!")}
  }

  onFilter(text)
  {  
    var str1 = ".*"+text+".*";
    titulo = str1;
    alert("We are experiencing some difficulties with the filter service, please try again.");
  }

  render() {    
    return (
      <div className="App">
          <NavBar/>
          
          <div className="head">
            <h1>Welcome to music voter!</h1>
            <h2>Music Vote</h2>
            <p>This is a web page for you to vote for your favorite song! Or add your favorite one.</p>
            <p>This will show the first 10 songs according to the number of votes!</p>
            <p>Remember you must log in! Now...let's play!</p>
          </div>
          <PostList className="postslist"
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
    Meteor.subscribe('posts');
    return {
      //lo limite al top 10 mas votadas
      posts: Posts.find({"text" : {$regex : titulo}}, {limit: 10,sort: {voteCount:-1}}).fetch()
    };
  }
)(App);

