const mainUrl = "https://api.openbrewerydb.org/breweries";

export default {
  allBreweries: () => `${mainUrl}`,
  single: (id) => `${mainUrl}/${id}`,
  autocomplete: (cityName) => `${mainUrl}?by_city=${cityName}`,
};
