const mainUrl = "https://api.openbrewerydb.org/breweries";

// CR: I would expect the BreweryService to hande those URL manipluations.
export default {
  allBreweriesFetch: () => `${mainUrl}`,
  sortByLocationFetch: (latitude, longitude) =>
    `${mainUrl}?by_dist=${latitude},${longitude}`,
};
