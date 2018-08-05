import React, { Component } from 'react';

class LocationList extends Component {
  render() {
    const { updateQuery, filterLocations, locations, showLocationData, markers } = this.props;

  	return(
      <div className="locations">
        <div className="search">
          <input 
            aria-label="search locations"
            className="search-input"
             placeholder="Search locations" 
             onChange={e => { updateQuery(e.target.value) }}>          
          </input>
          <button 
            className="filter-button"
             onClick={ e => { filterLocations()} } aria-label="filter">filter
          </button>
        </div>    
          <div className="search-locations">
            <ul className="locations-list">
	          { locations.map((location, index) => 
	        	<li className="location" key={index} tabIndex={0} onClick={e => { showLocationData(e, markers)}}>{ location.name }</li>
	          )}
            </ul>
            
          </div>
          <div className="foursquare-attribution">
            <p>Foursquare API</p>
          </div>
      </div>
  	)
  }
}

export default LocationList;

