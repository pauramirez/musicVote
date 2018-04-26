import React, { Component } from "react";
import PropTypes from "prop-types";
import { Meteor } from 'meteor/meteor';
import Post from "./Post";

export default class Video extends Component {

  constructor(props) {
    super(props);

    this.state={

    };
    this.renderVideo = this.renderVideo.bind(this);
  }

  renderVideo() {

    // <!-- 1. The <iframe> (and video player) will replace this <div> tag. -->
    <div id="player"></div>

      // 2. This code loads the IFrame Player API code asynchronously.
      var tag = document.createElement('script');


    var tag = document.createElement('script');

      tag.src = "https://www.youtube.com/iframe_api";
      var firstScriptTag = document.getElementsByTagName('script')[0];
      firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

      // 3. This function creates an <iframe> (and YouTube player)
      //    after the API code downloads.
      let urlP = this.props.video
      let res = urlP.split("=");
      let id = res[1];

      var player;
      function onYouTubeIframeAPIReady() {
        player = new YT.Player('player', {
          height: '390',
          width: '640',
          videoId: id,
          events: {
            //'onReady': onPlayerReady,
            'onStateChange': onPlayerStateChange
          }
        });
      }

      // 4. The API will call this function when the video player is ready.
      function onPlayerReady(event) {
        event.target.playVideo();
      }

      // 5. The API calls this function when the player's state changes.
      //    The function indicates that when playing a video (state=1),
      //    the player should play for six seconds and then stop.
      var done = false;
      function onPlayerStateChange(event) {
        if (event.data == YT.PlayerState.PLAYING && !done) {
          
          done = true;
        }
      }

    // let tag = document.createElement('script');
    // // let url = getURL(post)
    // let url = this.props.video;
    // tag.src = "https://www.youtube.com/iframe_api";
    // var firstScriptTag = document.getElementsByTagName('script')[0];

    // firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

    //   // 3. This function creates an <iframe> (and YouTube player)
    //   //    after the API code downloads.
    //   var player;
    //   // onYouTubeIframeAPIReady(url);

      // let res = url.split("=");
      // let id = res[1];

    //   player = new YT.Player('player', {
    //   height: '390',
    //   width: '640',
    //   videoId: id,
    //   events: {
    //         //'onReady': onPlayerReady,
    //     'onStateChange': onPlayerStateChange
    //   }
    // });

    //   event.target.playVideo();
  }

  

  render() {
    return (
      <div id="player">
        <div className="Video">
        <hr/>
            <div>
            {
              this.renderVideo()
            }
            </div>
        <br/>
      </div>
      </div>
    );
  }

}


Post.propTypes = {
  post: PropTypes.object.isRequired,
  onVote: PropTypes.func.isRequired
};