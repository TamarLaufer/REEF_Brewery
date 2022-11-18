import React, { useContext, useState, useEffect } from "react";
import url from "../Utils/URLs";
import useGeolocation from "react-hook-geolocation";
import useLocalSorage from "../Hooks/LocalStorage";

const BreweriesContext = React.createContext();

export function useBreweries() {
  return useContext(BreweriesContext);
}

export const BreweriesProvider = ({ children }) => {
  const [allBreweries, setAllBreweries] = useState([]);
  const [error, setError] = useState(null);
  const [favorites, setFavorites] = useState([]);
  const [showFavorites, setShowFavorites] = useState(false);
  const [cardInFavorites, setCardInFavorites] = useState(false);
  const [breweriesByDistance, setBreweriesByDistance] = useState([]);
  const [showSortedByDistance, setShowSortedByDistance] = useState(false);
  const FAVORITES_KEY = "favorites";
  const BREWERIES_BY_DISTANCE = "breweriesByDistance";

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
    localStorage.setItem(FAVORITES_KEY, JSON.stringify(favorites));
  };

  const loadBreweriesByDistance = () => {
    const json = localStorage.getItem(BREWERIES_BY_DISTANCE);
    if (json) return JSON.parse(json);
    return [];
  };

  const saveBreweriesByDistance = (breweriesByDistance) => {
    localStorage.setItem(
      BREWERIES_BY_DISTANCE,
      JSON.stringify(breweriesByDistance)
    );
  };

  const addToFavorites = (id) => {
    const favExist = favorites.find((item) => item.id === id);
    if (favExist) return;
    setFavorites((prevFavorites) => {
      const thisFav = allBreweries?.find((item) => item.id === id);
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
        showFavorites,
        setShowFavorites,
        cardInFavorites,
        setCardInFavorites,
        showSortedByDistance,
        setShowSortedByDistance,
        breweriesByDistance,
        setBreweriesByDistance,
      }}
    >
      {children}
    </BreweriesContext.Provider>
  );
};
