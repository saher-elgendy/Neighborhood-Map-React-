import React, { Component } from 'react';
import { render } from 'react-dom';
import escapeRegExp from 'escape-string-regexp';

class MapContainer extends Component {
  state = {
    locations: this.props.locations,
    markers: [],
    query: this.props.query,
    map: '',
  }
  
  render() {

    return (
     
      <div className="map-container">
        <div  id='map'/>
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