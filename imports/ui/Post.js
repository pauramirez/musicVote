import React, { Component } from "react";
import PropTypes from "prop-types";
import { Meteor } from 'meteor/meteor';

export default class Post extends Component {
  
  constructor(props) {
    super(props);

    this.state={

    };
  }

  renderVotes() {
    let res=[];
    for (let song in this.props.post.votes) {
      res.push(
        <button className="love"
          onClick={() =>
            this.props.onVote(
              this.props.post,
              song
            )}
          key={song}>{song} {this.props.post.votes[song]}</button>
      );
    }
    return res;
  }

  renderRemoveVotes() {
    let res=[];
    for (let song in this.props.post.not) {
      res.push(
        <button className="not"
          onClick={() =>
            this.props.onRemoveVote(
              this.props.post,
              song
            )}
          key={song}>{song} {this.props.post.not[song]}</button>
      );
    }
    return res;
  }

  renderDelete() {
    let res=[];
    for (let song in this.props.post.delete) {
      res.push(
        <button className="delete"
          onClick={() =>
            this.props.onDelete(
              this.props.post,
              song
            )}
          key={song}>{song} {this.props.post.delete[song]}</button>
      );
    }
    return res;
  }

  render() {
    return (
        <div className="Post">
        <hr/>
        <div className ="row">
          <div className="col-sm-6">
         
            <div><h5>🎶{this.props.post.text}</h5></div>
            <div>Artist: {this.props.post.artist}</div>
            <div>Added by: {this.props.post.user} </div>
            <div>Voted {this.props.post.voteCount} times</div>
          </div>
          <div className="col-sm-6">

            <div>
            <img class="photo" src="https://www.google.com.co/search?q="{this.props.post.artist}"&rlz=1C5CHFA_enUS749US749&source=lnms&tbm=isch&sa=X&ved=2ahUKEwiukoXLwMDaAhVF0lMKHc5_DtQQ_AUoAXoECAAQAw&biw=1330&bih=668" alt ="Imagen del artista de la cancion"/>
            <div>Find it at: <a href={this.props.post.url}>Video</a></div>
            </div>
            {this.renderVotes()}
            {this.renderRemoveVotes()}
            {this.renderDelete()}
          </div>
        </div>
        <br/>
      </div>
    );
  }
}

Post.propTypes = {
  post: PropTypes.object.isRequired,
  onVote: PropTypes.func.isRequired
};


