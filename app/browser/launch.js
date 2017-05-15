import React from 'react';
import { Link } from 'react-router';
import { browserHistory } from 'react-router'

class LaunchComponent extends React.Component {
  constructor(props){
    super(props);
    this.onSubmitForm = this.onSubmitForm.bind(this);
  }

  onSubmitForm(evt){
    evt.preventDefault();
    this.props.updateHandle(evt.target.name.value);
    if(evt.target.room.value) this.props.updateRoom(evt.target.room.value);
    browserHistory.push('/lobby');
  }

  render(){
    return (
    <div className="login-bg">
    <div className="valign-wrapper" style={{width:'100%',height:'100%', position: 'absolute'}}>
      <div className="valign" style={{width:'100%'}}>
        <div className="container">
          <div className="row">
            <div className="col s12 m8 offset-m2 l6 offset-l3">
              <div className="card hoverable" style={{background: 'rgba(0, 0, 0, 0.75)'}}>

                <div className="card-image">
                  <img  className="poster" 
                        src="images/logo.png"
                        style={{width: "100%"}} />
                </div>
                <div className="card-content">
                  <form onSubmit={this.onSubmitForm}>
                    <div className="card-content">
                      <div className="input-field">
                        <input id="name" type="text" className="validate white-text" required/>
                        <label htmlFor="name">Name</label>
                      </div>
                      <div className="input-field">
                        <input id="room" type="text" className="validate white-text"/>
                        <label htmlFor="room">Peer Room Name</label>
                      </div>
                    </div>
                    <div className="card-action right-align">
                      <a className="activator">Need Help?</a>
                      <button className="btn waves-effect waves-light">Enter Lobby</button>
                    </div>
                  </form>
                </div>

                <div className="card-reveal">
                  <span className="card-title grey-text text-darken-4">Instructions<i className="material-icons right">close</i></span>
                  <p>Welcome to InterVR, a web app for people looking for interview practice.</p>
                  <p>Our website does not require accounts and instead allows users to choose an arbitrary username on launch.
                      Also on this page, users may indicate a room name, which will allow users to interact with other users.
                      If no room is chosen, a random one will be assigned.</p>
                  <p><b>Peer Room: </b>Here users can communicate with others in a VR world with voice.  The users available will be
                      the ones with the same room name.</p>
                  <p><b>Bot Room: </b>Here users will be put in a room with a bot.  The bot will ask a series of interview questions.
                      The user will be able to answer them, and the bot will ask another question after a brief moment of silence.</p>
                  <p>All rooms have an exit sign, which will return to the lobby.</p>
                  <p><a href="https://github.com/fullstack1702-group-a/vr-interview-prep" target="_blank">Check out our GitHub!</a></p>
                  <p><i>Website by: Christopher Gupta, Edward Goo, Hannah Kim, Michael Chen</i></p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    </div>
    )
  }
}

import { connect } from 'react-redux';
import { updateHandle, updateRoom } from '../reducers/self';

export default connect(null, ({updateHandle, updateRoom}))(LaunchComponent);
