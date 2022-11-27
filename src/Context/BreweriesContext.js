import React, { useContext, useState, useEffect } from "react";
import url from "../Utils/URLs";

// CR: No error handling
const BreweriesContext = React.createContext();

export function useBreweries() {
  return useContext(BreweriesContext);
}
// CR: I don't like context personally, due to several reasons:
// CR: a. They contain both a state and logic, meaning its both a Service and a Store
// CR: b. It's now what we call SRP, or single responsibility, meaning I will have to modify this file for both accesing breweries and the state itself
// CR: c. I can't inject to a component only the data (state), and it has to have access to the fetch mechanics as well.
// CR: d. It doesn't allow me to use an Async/Await API, but to use simple promises.
export const BreweriesProvider = ({ children }) => {
  const view = {
    ALL: "all",
    FAVORITES: "favorites",
    BY_DISTANCE: "by distance",
  };
  const [allBreweries, setAllBreweries] = useState([]);
  const [error, setError] = useState(null);
  const [favorites, setFavorites] = useState([]);
  const [showView, setShowView] = useState(view.ALL);
  const [cardInFavorites, setCardInFavorites] = useState(false);
  const [breweriesByDistance, setBreweriesByDistance] = useState([]);
  const [showSortedByDistance, setShowSortedByDistance] = useState(false);
  const FAVORITES_KEY = "favorites";

  const getAllBreweries = () => {
    fetch(url.allBreweriesFetch())
      .then((res) => res.json())
      .then(
        (result) => {
          setAllBreweries(result);
          console.log(result);
        },
        (error) => {
          setError(error);
        }
      );
  };

  const getBreweriesByDistance = (latitude, longitude) => {
    fetch(url.sortByLocationFetch(latitude, longitude))
      .then((res) => res.json())
      .then(
        (result) => {
          setBreweriesByDistance(result);
          console.log(result);
        },
        (error) => {
          setError(error);
        }
      );
  };

  // CR: Why wrap it all in useEffect? the tirgger is empty
  useEffect(() => {
    navigator.geolocation.getCurrentPosition(function async(position) {
      getBreweriesByDistance(
        position.coords.latitude,
        position.coords.longitude
      );
    });
    getAllBreweries();
    setFavorites(loadFavorites());
  }, []);

  const loadFavorites = () => {
    const json = localStorage.getItem(FAVORITES_KEY);
    if (json) return JSON.parse(json);
    return [];
  };

  const saveFavorites = (favorites) => {
    // CR: Should be contained in "FavoriteBreweriesService", which will abstractify the entire localStorage usage,
    // CR: which would allow us to move later in the future to saving the favorites in both a different mechanism and location (e.g server/database)
    localStorage.setItem(FAVORITES_KEY, JSON.stringify(favorites));
  };

  const getBreweryList = () => {
    if (showView === view.ALL) {
      return allBreweries;
    } else if (showView === view.FAVORITES) {
      return favorites;
    }
    return breweriesByDistance;
  };

  const addToFavorites = (id) => {
    const favExist = favorites.find((item) => item.id === id);
    if (favExist) return;
    setFavorites((prevFavorites) => {
      const thisFav = getBreweryList().find((item) => item.id === id);
      if (thisFav) {
        saveFavorites([...prevFavorites, thisFav]);
        return [...prevFavorites, thisFav];
      }
    });
  };

  const removeFromFavorites = (id) => {
    setFavorites((prevFavorites) => {
      saveFavorites(prevFavorites.filter((brewery) => brewery.id !== id));
      return prevFavorites.filter((brewery) => brewery.id !== id);
    });
  };

  return (
    <BreweriesContext.Provider
      value={{
        favorites,
        allBreweries,
        addToFavorites,
        removeFromFavorites,
        showView,
        setShowView,
        view,
        cardInFavorites,
        setCardInFavorites,
        showSortedByDistance,
        setShowSortedByDistance,
        breweriesByDistance,
        setBreweriesByDistance,
        getBreweryList,
      }}
    >
      {children}
    </BreweriesContext.Provider>
  );
};
