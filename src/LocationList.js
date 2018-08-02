import React, { Component } from 'react';
import escapeRegExp from 'escape-string-regexp';

class LocationList extends Component {
  

  render() {
    const { updateQuery, filterLocations, locations, showLocationData, markers} = this.props;

  	return(
      <div className="locations">
        <div className="search">
          <input 
            className="search-input"
             placeholder="Search locations" 
             onChange={e => { updateQuery(e.target.value) }}>          
          </input>
          <button 
            className="filter-button"
             onClick={ e => { filterLocations()} }>
             Filter
          </button>
        </div>    
          <div className="search-locations">
            <ul className="locations-list">
	          { locations.map((location, index) => 
	        	<li className="location" key={index} onClick={e => { showLocationData(e, markers)}}>{ location.title }</li>
	          )}
            </ul>
          </div>
      </div>
  	)
  }
}

export default LocationList;