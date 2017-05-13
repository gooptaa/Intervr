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
      <div>
        <form onSubmit={this.onSubmitForm}>
          <label>Name: </label>
          <input name="name" required />
          <label>Peer Room: </label>
          <input name="room" />
          <button>Enter Lobby</button>
        </form>
      </div>
    )
  }
}

import { connect } from 'react-redux';
import { updateHandle } from '../reducers/self';
import { updateRoom } from '../reducers/self';

export default connect(null, ({updateHandle, updateRoom}))(LaunchComponent);