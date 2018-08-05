import React, { Component } from 'react';
import MapContainer from './MapContainer';
import LocationList from './LocationList';
import escapeRegExp from 'escape-string-regexp';
import './App.css';

import * as FoursquareAPI from './FoursquareAPI'

class App extends Component {

  state = {
    allLocations: [], 
    locations: [],
    map:'',
    query: '',
    markers: [],
    infoWindow: '', 
    match: '',
  }

  componentDidMount() {
    FoursquareAPI.getLocations().then(locations => {
      // creating two instances of data ,one for processing and other represents the complete data
      this.setState({  locations, allLocations: locations })
      //load the map with all features
      this.createScript();
    // error on fetching locations should be handled here    
    }).catch(err => alert("map and locations can not be loaded properly, try refreshing the page"))       
  }
  
  createScript() {
    const script = document.createElement('script');
    script.src="https://maps.googleapis.com/maps/api/js?key=AIzaSyCaGtxAabSe5qzzVKprFRRA492BjqpD3G4";
    document.body.appendChild(script);
    script.addEventListener('load', e => {this.initMap()}); 
  }

  initMap() {
    //initilizing our map with all markers
    const map = new window.google.maps.Map(
    document.getElementById('map'), {
      center: this.state.locations[0].position,
      zoom: 15
    })
    
    this.loadMarkers(map);
    
    this.setState({
      map: map,
    })
  }
  
  loadMarkers(map) {
    let marker;
    const bounds = new window.google.maps.LatLngBounds()
    //creating our markers depending on the locations
    this.setState({
      markers: this.state.locations.map(location => {
        marker = new window.google.maps.Marker({
          position: {lat: location.location.lat, lng: location.location.lng},
          map: map,
          animation: window.google.maps.Animation.DROP,
          title: location.name,
          address: location.location.address
        })

        bounds.extend(marker.position);
        return marker;
      })
    })
    //now all markers appear in the initial view of the map
    map.fitBounds(bounds)
    //showing the infoWindow for the clicked marker
    this.addInfoWindow(map);
  }

  addInfoWindow(map) {
    const infoWindow = new window.google.maps.InfoWindow();

    this.setState({
      infoWindow: infoWindow,
    })

    this.state.markers.forEach(marker => {
      //if markr is clicked open the  infoWindow with the information needed
      marker.addListener('click', function(){
        map.setZoom(13);
        map.getCenter(marker.position)

        if(infoWindow.marker !== this){
          infoWindow.marker = this;
          infoWindow.setContent(`Adress: ${marker.address ? marker.address : 'address could not be fetched'}`)
          infoWindow.open(map, this);
          marker.addListener('closeclick', function() {
            infoWindow.setMarker(null);
          });
        }
      });
    });    
  }
  //updating the query if the use searched for a location
  updateQuery = (query) => {
    this.setState({
      query: query.trim()
    });
  }
  //filtering the location depending on the user query
  filterLocations =()=> {
    const { query } = this.state;
    //if there is a query filter the locationns depending on this query
    if(query) {
      const match = new RegExp(escapeRegExp(query), 'i')
      this.setState(state => ({
        match: match,
        locations: this.state.allLocations.filter(location => match.test(location.name)),
      })) 
    }
    else {
      // if no query exist show the all location if filter button clicked
      this.setState({
        locations: this.state.allLocations,
      })
    }
  }
  /*linking the locations items and the markers, if an item clicked, the corresponding marker
  would animate and showing its infoWindow with the corresponding info*/
  showLocationData = (e, markers) => {
    const {infoWindow, map} = this.state;
    //if an item is clicked
    markers.forEach(marker => {
      //stop all markers animation
      marker.setAnimation(null)
      //if the clicked item text is equal to the marker title relate them
      if(e.target.innerHTML === marker.title) {
        marker.setAnimation(window.google.maps.Animation.BOUNCE);
        infoWindow.setContent(`Adress: ${marker.address ? marker.address : 'address could not be fetched'}`);
        infoWindow.open(map, marker);
        setTimeout(marker.setAnimation(null), 0);
      }
    })
  }
  //if the hamburger icon clicked, it toggles showing the locations list
  toggleShowList() {
    const locationsList = document.querySelector('.locations');

    if(!locationsList.classList.contains('open')) {
      locationsList.classList.add('open');
    }
    else {
      locationsList.classList.remove('open');
    }
  }

  componentDidUpdate(prevProps, prevState) {
    const { markers, map, locations, query, match } = this.state;
    //if current locations are different from previous locations, change markers to correspond
    //the locations
    if(prevState.locations !== locations) {
      //first remove all the markers from the map
      markers.forEach(marker => marker.setMap(null));
   
      let showingMarkers;

      if(query) {
        showingMarkers = markers.filter(marker => match.test(marker.title));
      }
      else {
        showingMarkers = markers;
      }
      //set the new markers to the map
      showingMarkers.forEach(marker => marker.setMap(map));
    }
  }

  render() {
    const { markers, locations } = this.state;
    
    return (
     <div className="app">
       <header className="header">Cairo Landmarks</header>

       <MapContainer toggleShowList={this.toggleShowList}/>

       <LocationList  
         locations={ locations }
         updateQuery={ this.updateQuery } 
         filterLocations={this.filterLocations}
         showLocationData = { this.showLocationData } 
         markers={ markers }
       />

       <footer className="footer">
         <div className="footer-content">
           <span>Saher Elgendy develops 2018</span>
         </div>
         <div className="footer-icon">
           <a href="https://www.facebook.com/saher.elgendy.71"><i className="fa fa-facebook-square"></i></a>
           <a href="https://www.linkedin.com/in/saher-mostafa-1292818a/"><i className="fa fa-linkedin contact"></i></a>
           <a href="https://github.com/saher-elgendy"><i className="fa fa-github"></i></a>
         </div>
       </footer>
       </div>
    );
  }
}

export default App;

 
 