import React, { useState, useEffect } from "react";
import { useBreweries } from "../Context/BreweriesContext";
import BreweryCard from "./BreweryCard";
import bgImage from "../Utils/breweryImg.jpg";

const AllBreweries = () => {
  const { allBreweries, addToFavorites, showFavorites, favorites } =
    useBreweries();

  const getBreweryList = () => {
    if (showFavorites === true) return favorites;
    return allBreweries;
  };

  return (
    <div
      style={{
        padding: "2rem",
        backgroundImage: `url(${bgImage})`,
        backgroundSize: "cover",
      }}
      className='d-flex justify-content-center align-items-baseline flex-wrap gap-4'
    >
      {getBreweryList().map((brewery) => {
        return <BreweryCard key={brewery.id} brewery={brewery} />;
      })}
    </div>
  );
};

export default AllBreweries;
