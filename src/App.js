import React, { Component } from 'react';
import './App.css';
import MapContainer from './MapContainer'

class App extends Component {

  render() {

    return (
      <div className="fluid-container">
        <div>
          <nav className="navbar navbar-default" id="navigation-bar">
          <a className="navbar-brand" id="logo-center"><img style={{height:'100px'} }src="./citylogo.png" alt="" /></a>
            <div>
              <p className="city-name">PUBLIC WASHROOMS</p>
            </div>
          
          </nav>
        </div>
        <div>
          <MapContainer washrooms={this.props.washrooms} />
        </div>
      </div>
    );
  }
}

export default App;
