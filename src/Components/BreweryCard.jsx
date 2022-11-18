import React, { useEffect, useState } from "react";
import { Button, Card } from "react-bootstrap";
import { useBreweries } from "../Context/BreweriesContext";

export const BreweryCard = ({ brewery }) => {
  const { addToFavorites, favorites, removeFromFavorites } = useBreweries();

  const isIdExistInFavorites = () => {
    const favExist = favorites.find((item) => item.id === brewery.id);
    if (favExist) return true;
    return false;
  };

  return (
    <Card
      style={{
        width: "18rem",
        height: "20rem",
      }}
      className='d-flex justify-content-between align-items-center bg-light'
    >
      <Card.Header
        style={{ width: "18rem", height: "4rem" }}
        className='d-flex justify-content-center align-items-center'
      >
        {brewery.name}
      </Card.Header>
      <br />
      <Card.Body
        className='d-flex justify-content-center align-items-evenly flex-wrap bg-light'
        style={{ backgroundColor: "red", borderRadius: "1.5rem" }}
      >
        <Card.Text>
          {brewery.city} {brewery.street}
        </Card.Text>
        <br />
        <Card.Text>
          Phone:
          {brewery.phone}
        </Card.Text>
        <br />
        <Card.Link
          href={brewery.website_url}
          style={{ color: "black", cursor: "pointer" }}
        >
          {brewery.website_url}
        </Card.Link>
        <br />
        <Button
          onClick={() => addToFavorites(brewery.id)}
          variant='outline-success'
          style={{ width: "11rem", height: "3.3rem" }}
          disabled={isIdExistInFavorites()}
          className='d-flex justify-content-center align-items-center pt-3'
        >
          {isIdExistInFavorites() ? (
            <p>In favorites</p>
          ) : (
            <p>Add to favorites</p>
          )}
        </Button>
        {isIdExistInFavorites() && (
          <Card.Link
            style={{ color: "black", cursor: "pointer", fontSize: "13px" }}
            onClick={() => removeFromFavorites(brewery.id)}
          >
            Remove from favorites
          </Card.Link>
        )}
      </Card.Body>
    </Card>
  );
};

export default BreweryCard;
