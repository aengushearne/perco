import config from '../config';

const CLIENT_ID = config.CLIENT_ID;
const CLIENT_SECRET = config.CLIENT_SECRET;
const categoryId = '4bf58dd8d48988d1e0931735'; //restrict to coffee-shops

export function fetchData(){
  const url = `https://api.foursquare.com/v2/venues/search?ll=45.5,-73.5&categoryId=${categoryId}&openNow=1&client_id=${CLIENT_ID}&client_secret=${CLIENT_SECRET}&v=20170915`;
  return fetch(url).then(res => res.json()).then(json => ({
    venues: json.response.venues,
  }));
};

export function fetchVenueDetails(venue){
  const url = `https://api.foursquare.com/v2/venues/${venue}?client_id=${CLIENT_ID}&client_secret=${CLIENT_SECRET}&v=20170915`;
  return fetch(url).then(res => res.json()).then(json => ({
    venue: json.response.venue,
  }));
};