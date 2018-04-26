import {Meteor} from "meteor/meteor";
import React from "react";
import {render} from "react-dom";
import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';

import '../imports/startup/accounts-config.js';


import App from "../imports/ui/App";

//Artists helpers
Template.artists.helpers({
	artists(){
		return Session.get('artists');
	}
})
//search Events
Template.search.events({
	'keyup #searchArtists':function(){
		let searchText=event.target.value;

		if(searchText==''){
			Session.set('artists',null);
		}

		Meteor.call('searchArtists',searchText, (err,artists)=>{
			if(err){
				console.log(err);
			}
			else{
				console.log(artists);
				Session.set('artists',artists);
			}
		});
	}
});

Meteor.startup(() => {
  render(<App></App>,
    document.getElementById("render-target"));

});