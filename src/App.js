import React, { Component } from 'react';
import MapContainer from './MapContainer';
import LocationList from './LocationList'
import { render } from 'react-dom';
import escapeRegExp from 'escape-string-regexp';
import sortBy from 'sort-by';
import './App.css';

class App extends Component {
  allLocations =  [
    {title: 'Great Pyramid', location: {lat: 29.979379560101638, lng: 31.13419599427948}},
    {title: 'Khafre Pyramid' , location: {lat: 29.97614575245414 , lng: 31.130848597429008}},
    {title: 'Mankaure Pyramid', location: {lat: 29.9725443872708 , lng: 31.128236125848503}},
    {title: 'Sphinx', location: {lat: 29.975309317987243, lng: 31.13755411996624}},
    {title: 'Museum of Cairo', location: {lat:   30.047503, lng: 31.233702}},
    {title: 'Khan el-Khalili', location: {lat: 30.041833166 , lng: 31.257332304}},
    {title: 'Cairo Tower', location: {lat: 30.045916, lng: 31.224291}},
    {title: 'Tahrir Square', location: {lat: 30.0444, lng: 31.2357}},
    {title: 'Saladin Citadel of Cairo', location: {lat: 30.0298604 , lng: 31.261105499999985}},
    {title: 'Muhammad Ali Mosque', location: {lat: 30.0287015, lng: 31.259910600000012}},
    {title: 'Al-Azhar Mosque', location: {lat: 30.045688, lng: 31.2626851}},
    {title: 'Baron Empain Palace', location: {lat: 30.08671339999999, lng: 31.33025900000007}},
    {title: 'Pharaonic Village', location: {lat: 29.9972598, lng: 31.215169800000012}},
    {title: 'Al Qanatir Al Khayriyyah', location: {lat: 30.1902447, lng: 31.138434200000006}},
    {title: 'Abdeen Palace', location: {lat: 30.0430033, lng: 31.247779600000058}},
    {title: 'cairo opera house ',location: {lat: 30.0424866,lng: 31.224456799999984}},
    {title: 'Coptic Museum', location: {lat: 30.0060382, lng: 31.2301827}},
    {title: 'Cairo International Park', location: {lat: 30.0494138,lng: 31.33650829999999}},
    {title: 'Aquarium Grotto Garden', location: {lat: 30.0565699,lng: 31.218614000000002}},
    {title: 'Hanging Church', location: {lat: 30.0052663, lng: 31.230182600000035}}
  ]

  state = {
    locations: this.allLocations,
    map:'',
    query: '',
    markers: [],
    infoWindow: '',
  }

  componentDidMount(){  
   this.createScript(); 
 }

  createScript() {
    const script = document.createElement('script');
    script.src="https://maps.googleapis.com/maps/api/js?key=AIzaSyBRTschOElF6NRclmCZymKOoGb0jKlNtfU";
    document.body.appendChild(script);
    script.addEventListener('load', e => {this.initMap()})   
  }

  
  initMap() {
    const map = new window.google.maps.Map(
    document.getElementById('map'), {
      center: {lat: 30.044281 , lng: 31.340002},
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
    this.setState({
      markers: this.state.locations.map(location => {
        marker = new window.google.maps.Marker({
          position: location.location,
          map: map,
          animation: window.google.maps.Animation.DROP,
          title: location.title,
        })
        
        bounds.extend(marker.position);
        return marker;
      })
    })

    map.fitBounds(bounds)
    
    this.addInfoWindow(map);
  }

  addInfoWindow(map) {
    const infoWindow = new window.google.maps.InfoWindow();

    this.setState({
       infoWindow: infoWindow,
    })

    this.state.markers.forEach(marker => {

      marker.addListener('click', function() {
        map.setZoom(13);
        map.getCenter(marker.position)

        if(infoWindow.marker != this){
          infoWindow.marker = this;
          infoWindow.setContent(`${this.title}`);
          infoWindow.open(map, this);
          marker.addListener('closeclick', function() {
            infoWindow.setMarker(null);
          });
        }
      });
    });

     
  }

 updateQuery = (query) => {
    this.setState({
      query: query.trim()
    });
  }

  filterLocations =()=> {
    const { query } = this.state;

    if(query) {
      const match = new RegExp(escapeRegExp(query), 'i')
      this.setState(state => ({
        locations: this.allLocations.filter(location => match.test(location.title))
      }))
    }
    else {
      this.setState({
        locations: this.allLocations
      })
    }
  }

  componentDidUpdate(prevProps, prevState) {
    const { markers, map, locations } = this.state;

    if(prevState.locations != this.state.locations) {
      let showingMarkers;
      markers.forEach(marker => marker.setMap(null))
      showingMarkers = locations.map(location => markers.filter(marker => marker.title === location.title).find(marker => marker))
      showingMarkers.forEach(marker => marker.setMap(map))
    }
  }

  showLocationData = (e, markers) => {
    const {infoWindow, map} = this.state;

    markers.forEach(marker => {
      marker.setAnimation(null)

      if(e.target.innerHTML === marker.title) {
        marker.setAnimation(window.google.maps.Animation.BOUNCE);
        infoWindow.setContent(marker.title)
        infoWindow.open(map, marker)
        setTimeout(marker.setAnimation(null), 0);
      }
    })
  }
 
  render() {

    const { locations, query } = this.state;


    return (
     <div className="app">
     
      <MapContainer
        locations={ locations  } 
        updateQuery={ this.updateQuery } 
        filterLocations={ this.filterLocations }
        query={ query }
        markers={this.state.markers}
        loadMarkers={this.loadMarkers}
        filterMarkers={this.filterMarkers}
        map={this.state.map} />

      <LocationList  
        locations={ locations }
        updateQuery={ this.updateQuery } 
        filterLocations={this.filterLocations}
        showLocationData = { this.showLocationData } 
        markers={this.state.markers}
      />
      </div>
    );
  }
}

export default App;
