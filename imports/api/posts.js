import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check';
import { HTTP } from 'meteor/http';


export const Posts = new Mongo.Collection("posts");


//metodos para quitar el autopublish

if (Meteor.isServer) {
  // This code only runs on the server
  Meteor.publish('posts', function postsPublication() {
    return Posts.find();
  });
  
  //Falta RateLimiter
}

Meteor.methods({
  'postsInsert'(user, text, artist, url) {
 
    // Make sure the user is logged in before inserting a post
    if (! this.userId) {
      throw new Meteor.Error('not-authorized');
    }
 
    Posts.insert({
        user,
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

  songFind(post) {

    // HTTP.call('GET','http://ws.audioscrobbler.com/2.0/?method=artist.search&artist=cher&api_key=770feb48e1d6f73b9247e37bdeec2315&format=json');
    // HTTP.get('https://ws.audioscrobbler.com/2.0/', {
    //   params: { method: 'track.search', track: song.data.name + ' ' + song.data.artists[0].name, api_key: process.env.Client_ID, format: 'json' } }, (error, result) => {
    //     if (!error) {
    //       Songs.update(song._id, { $set: { lastFm: result.data.results.trackmatches.track[0] } });
    //     }
    //   });
  },

});





