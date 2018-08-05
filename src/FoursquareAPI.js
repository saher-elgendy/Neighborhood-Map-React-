

 export const getLocations = () => {
  
 const client_id = "0SMVKXOIEVHFQN1THY15VGZXKZOUBMI422EXPRLKU4KF420H";
  const client_secret = "QGTY2DWVR0YNAFNA22YR3P0AUKXIWLCGMMZGZEPUN0TR2HAU";

  const api = "https://api.foursquare.com";
  const locationsRequest =  fetch(`${api}/v2/venues/search?ll=30.044281,31.340002&categoryId=4bf58dd8d48988d181941735,4bf58dd8d48988d181941735,4bf58dd8d48988d13a941735&client_id=${client_id}&client_secret=${client_secret}&v=20180719`);
  
  return locationsRequest.then(response => {
  	if(response.ok) {
  		return response.json();
  	}	
  }).then(locations => locations.response.venues);
}

