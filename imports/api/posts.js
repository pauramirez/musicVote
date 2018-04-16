import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check';
import { HTTP } from 'meteor/http';


export const Posts = new Mongo.Collection("posts");


//metodos para quitar el autopublish

if (Meteor.isServer) {
  // This code only runs on the server
  Meteor.publish('tasks', function postsPublication() {
    return Posts.find();
  });
}

Meteor.methods({
  'postsInsert'(text, artist, url) {
 
    // Make sure the user is logged in before inserting a post
    if (! this.userId) {
      throw new Meteor.Error('not-authorized');
    }
 
    Posts.insert({
        text,
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
  },
  'postsRemove'(postId) { 
    Posts.remove(postId);
  },

  'postsUpdate'(postId, post) { 
    Posts.update(postId, post);
  },

  songLastFM(song) {
    HTTP.get('https://ws.audioscrobbler.com/2.0/', {
      params: { method: 'track.search', track: song.data.name + ' ' + song.data.artists[0].name, api_key: process.env.LASTFM_APIKEY, format: 'json' } }, (error, result) => {
        if (!error) {
          Songs.update(song._id, { $set: { lastFm: result.data.results.trackmatches.track[0] } });
        }
      });
  },

});





