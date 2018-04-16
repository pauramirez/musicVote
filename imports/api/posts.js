import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check';


export const Posts = new Mongo.Collection("posts");

Meteor.methods({
  'posts.insert'(post) {
    check(text, Posts);
 
    // Make sure the user is logged in before inserting a post
    if (! this.userId) {
      throw new Meteor.Error('not-authorized');
    }
 
    Posts.insert({
      text,
      artist,
      url,
      voteCount
    });
  },
  'posts.remove'(postId) {
    check(taskId, String);
 
    Tasks.remove(taskId);
  },
  'posts.update'(taskId) { 
    Posts.update(taskId);
  },
});