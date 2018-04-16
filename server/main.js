import { Meteor } from 'meteor/meteor';

import "../imports/api/posts";


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