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
                <form onSubmit={this.onSubmitForm}>
                  <div className="card-content">
                        <label htmlFor="name">Name</label>
                        <input id="name" className="validate" name="name" required />
                        <label htmlFor="room">Peer Room Name</label>
                        <input id="room" className="validate" name="room" />
                  </div>
                  <div className="card-action right-align">
                    <button className="btn waves-effect waves-light">Enter Lobby</button>
                  </div>
                </form>
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
