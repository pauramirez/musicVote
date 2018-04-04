import React, { Component } from "react";
import PropTypes from "prop-types";
import { withTracker } from "meteor/react-meteor-data";

import AccountsUIWrapper from './AccountsUIWrapper';
import { Meteor } from 'meteor/meteor';

import PostList from "./PostList";
import PostAdd from "./PostAdd";
import PostFilter from "./PostFilter";
import { Posts } from "../api/posts";

var titulo =".*.*";
//var titulo =".*a.*";
//var currentUser =Meteor.user().username;

//Camilo A Carrillo N: No se deben hacer llamadas directas que modifiquen la BD desde el lado del cliente, para esto usen Meteor 
// Methods y hagan el llamado mediante Meteor.call("", );
export class App extends Component {


  constructor(props) {
    super(props);

  }

  isUserAdmin(){
    if (Meteor.user().username == "pauramirez" || Meteor.user().roll == "full") {
      return true;
    }
    else return false;
  }

  isUserActive(){
    if (Meteor.user().username != null || Meteor.user().roll != null) {
      return true;
    }
    else return false;
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
    
    //Camilo A Carrillo N: EJ: Meteor.call("Posts.removeVote", song.id);
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

    //Camilo A Carrillo N: EJ: Meteor.call("Posts.addVote", song.id);
    Posts.update(postObj._id,
      postObj);
  }

  onDelete(post, song) {
    if(this.isUserAdmin()){
      let postObj = Posts.findOne(post._id);
      
      Posts.remove(postObj._id);
    }
    else{window.alert("You are not admin, sorry! 😔")}
  }

  onAdd(text,artist,url) {
    if(this.isUserActive()){
      if (!text) return;
      
      //Camilo A Carrillo N: EJ: Meteor.call("Posts.addSong", text, artist, url);
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
         <AccountsUIWrapper />
          <h2>Music Vote</h2>
          <p>This is a web page for you to vote for your favorite song! Or add your favorite one.</p>
          <p>This will show the first 10 songs according to the number of votes!</p>
          <p>Remember you must log in! Now...let's play!</p>
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

