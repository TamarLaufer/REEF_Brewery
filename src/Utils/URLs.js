const mainUrl = "https://api.openbrewerydb.org/breweries";

export default {
  allBreweriesFetch: () => `${mainUrl}`,
  sortByLocationFetch: (latitude, longitude) =>
    `${mainUrl}?by_dist=${latitude},${longitude}`,
};
