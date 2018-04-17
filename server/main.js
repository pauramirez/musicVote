import { Meteor } from 'meteor/meteor';

import "../imports/api/posts";

Meteor.methods({
	'searchArtists'(searchText) { 
		const result = HTTP.call('GET','http://ws.audioscrobbler.com/2.0/?method=track.search&track='+searchText+'&api_key=770feb48e1d6f73b9247e37bdeec2315&format=json');
		//const result = HTTP.call('GET',' http://ws.audioscrobbler.com /2.0/?method=artist.search&artist=cher&api_key=770feb48e1d6f73b9247e37bdeec2315&format=json');
    
    //const result = HTTP.call('GET','https://api.spotify.com/v1/search?query='+searchText+'&offset=0&limit=20&type=artist&market=US');
    return result.data.results.trackmatches.track;
  		}  	
  	});
Meteor.startup(() => {
  
	// ServiceConfiguration.configurations.update(
	// {"service":"spotify"},
	// { $set: {
 //        "clientId": process.env.SPOTIFY_CLIENTID,
 //        "secret": process.env.SPOTIFY_SECRET
 //      }
 //  	},
 //  	{upsert: true}
	// );
});