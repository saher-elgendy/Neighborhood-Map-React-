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
  
 



 /*const script = document.createElement('script');
   script.src = "https://maps.googleapis.com/maps/api/js?key=AIzaSyCaGtxAabSe5qzzVKprFRRA492BjqpD3G4";
   document.body.appendChild(s)
   s.addEventListener('load', e => {this.initMap()})
   AIzaSyBRTschOElF6NRclmCZymKOoGb0jKlNtfU
   */