import React, { Component } from 'react';


class MapContainer extends Component {
  render() {
    return (
      
      <div className="map-container">
        <div className="menue-icon-container" onClick={this.props.toggleShowList}>
          <div className="bar"></div>
          <div className="bar"></div>
          <div className="bar"></div>
        </div>
       
        <div  id='map' role="application" aria-label="map"/>
      </div>
    );
  }
}

export default MapContainer;
  
 
