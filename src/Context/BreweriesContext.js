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
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  // const [favorites, setFavorites] = useLocalSorage("favorites", []);
  const [favorites, setFavorites] = useState([]);
  const FAVORITES_KEY = "favorites";
  const [showFavorites, setShowFavorites] = useState(false);
  const [cardInFavorites, setCardInFavorites] = useState(false);
  const [breweriesByDistance, setBreweriesByDistance] = useState([]);
  const [askForLocation, setAskForLocation] = useState(false);

  const geolocation = useGeolocation();

  // const onGeolocationUpdate = (geolocation) => {
  //   console.log(
  //     "Here’s some new data from the Geolocation API: ",
  //     geolocation.latitude,
  //     geolocation.longitude
  //   );
  // };

  // const askLocation = useGeolocation(
  //   {},
  //   onGeolocationUpdate(geolocation),
  //   false
  // );

  const getAllBreweries = () => {
    fetch(url.allBreweriesFetch())
      .then((res) => res.json())
      .then(
        (result) => {
          // setLoading(true);
          setAllBreweries(result);
          console.log(result);
        },
        (error) => {
          setLoading(true);
          setError(error);
        }
      );
  };

  const getBreweriesByDistance = (latitude, longitude) => {
    fetch(url.sortByLocationFetch(latitude, longitude))
      .then((res) => res.json())
      .then(
        (result) => {
          // setLoading(true);
          setBreweriesByDistance(result);
          console.log(result);
        },
        (error) => {
          setLoading(true);
          setError(error);
        }
      );
  };

  useEffect(() => {
    console.log(
      getBreweriesByDistance(geolocation.latitude, geolocation.longitude)
    );
    // console.log(askLocation);
    // setAskForLocation(true);
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
      }}
    >
      {children}
    </BreweriesContext.Provider>
  );
};
