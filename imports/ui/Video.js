import React, { Component } from "react";
import PropTypes from "prop-types";
import { Meteor } from 'meteor/meteor';

export default class Video extends Component {

  constructor(props) {
    super(props);

    this.state={

    };
  }

  renderVideo()
  {
    let tag = document.createElement('script');
    // let url = {this.props.post.url}; 
    tag.src = "https://www.youtube.com/iframe_api";
    var firstScriptTag = document.getElementsByTagName('script')[0];

    firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

      // 3. This function creates an <iframe> (and YouTube player)
      //    after the API code downloads.
      var player;
      onYouTubeIframeAPIReady(url);
      onPlayerReady();
  }

  onYouTubeIframeAPIReady(url) {
    let res = url.split("=");
    let id = res[1];

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

  onPlayerReady(event) {
      event.target.playVideo();
  }

  render() {
    return (
        <div className="Post">
        <hr/>
            <div>
            <div>Find it at: <a href={this.props.post.url}>Video</a></div>
            </div>
            {this.renderVotes()}
        <br/>
      </div>
    );
  }

}

Post.propTypes = {
  post: PropTypes.object.isRequired,
  onVote: PropTypes.func.isRequired
};