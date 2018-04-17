import {Meteor} from "meteor/meteor";
import React from "react";
import {render} from "react-dom";

import '../imports/startup/accounts-config.js';


import App from "../imports/ui/App";

Meteor.startup(() => {
  render(<App></App>,
    document.getElementById("render-target"));

});

//Search events
// App.PostFilter.events({
// 	"keyup #searchSong":function(){
// 		let searchText = event.target.value;
// 		console.log(searchText);
// 	}
// })


//archivo de configuracion
// var scopes = ['playlist-modify-private', 'user-library-read','user-follow-read', 'playlist-read-private'];
// Accounts.ui.config({'requestPermissions':{'spotify':scopes}});
