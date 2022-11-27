// CR: API Service to wrap OpenBreweryDB API

const baseUrl = "https://api.openbrewerydb.org/breweries";
function getAllBreweries(optionalArguments = {} ,page = 1) {
  perPage = 20;
  optionalArguments.per_page = perPage;
  optionalArguments.page = page;

  const qs =  queryString.stringify(optionalArguments); 
  // "?per_page=20&page=1&by_dist=32.0599191,34.7851156"
   // "?per_page=20&page=1&by_type=micro"
  axios.
}

function getAllBerwiesByDistance(latitude, longitude, page = 1) {
  return getAllBreweries({
    'by_dist': `${latitude},${longitude}`
  }, page)
}

function getAllBreweriesByType(type, page = 1) {
  return getAllBreweries({
    'by_type': type
  }, page)
}