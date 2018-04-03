import {Meteor} from "meteor/meteor";
import React from "react";
import {render} from "react-dom";

import '../imports/startup/accounts-config.js';


import App from "../imports/ui/App";

Meteor.startup(() => {
  render(<App></App>,
    document.getElementById("render-target"));

});

//if (Meteor.isClient) {
//    onYouTubeIframeAPIReady = function () {
//        player = new YT.Player("player", {
//    
//            height: "400", 
//            width: "600", 
//            videoId: "LdH1hSWGFGU", 
//            events: {
//      
//                onReady: function (event) {
//                    event.target.playVideo();
//                }
//            }
//        });
//    };
//    YT.load();
//}


