import React from 'react';
import { Link } from 'react-router';
import { browserHistory } from 'react-router'

class LaunchComponent extends React.Component {
  constructor(props){
    super(props);
    this.onSubmitName = this.onSubmitName.bind(this);
  }

  onSubmitName(evt){
    evt.preventDefault();
    this.props.updateHandle(evt.target.name.value);
    browserHistory.push('/lobby');
  }

  render(){
    return (
      <div>
        <form onSubmit={this.onSubmitName}>
          <label>Name: </label>
          <input name="name" required />
          <button>Enter Lobby</button>
        </form>
      </div>
    )
  }
}

import { connect } from 'react-redux';
import { updateHandle } from '../reducers/self';

export default connect(null, ({updateHandle}))(LaunchComponent);