const client_id = "0SMVKXOIEVHFQN1THY15VGZXKZOUBMI422EXPRLKU4KF420H";
const client_secret = "QGTY2DWVR0YNAFNA22YR3P0AUKXIWLCGMMZGZEPUN0TR2HAU";


const api = "https://api.foursquare.com";

export const getVenue = () => {
  return fetch(`${api}/v2/venues/search?ll=25.694937,32.6244474&categoryId=4bf58dd8d48988d181941735,4bf58dd8d48988d13a941735&client_id=${client_id}&client_secret=${client_secret}&v=20180719`)
  .then(res => {
    if(!res.ok){
      throw Error(res.statusText)
    }
    return res.json()
  })
  .then(venue => venue.response.venues)
  .catch(err => console.log('Foursquare API error: ', err))
}

