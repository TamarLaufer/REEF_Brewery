import React, { useState } from "react";
import { Button, Card } from "react-bootstrap";
import { useBreweries } from "../Context/BreweriesContext";
import { TfiServer } from "react-icons/tfi";

export const BreweryCard = ({ brewery }) => {
  const { addToFavorites, favorites, removeFromFavorites } = useBreweries();
  const [showAsIs, setShowAsIs] = useState(false);

  const isIdExistInFavorites = () => {
    const favExist = favorites.find((item) => item.id === brewery.id);
    if (favExist) return true;
    return false;
  };

  const toggleAsIs = () => {
    if (showAsIs) {
      setShowAsIs(false);
    } else {
      setShowAsIs(true);
    }
  };

  return (
    <Card
      style={{
        width: "18rem",
        height: "20rem",
      }}
      className='d-flex justify-content-evenly align-items-center bg-light'
    >
      <Card.Header
        style={{ width: "18rem", height: "4rem" }}
        className='d-flex justify-content-center align-items-center'
      >
        {brewery.name || " "}
      </Card.Header>

      <Card.Body
        className='d-flex justify-content-center align-items-between flex-wrap bg-light'
        style={{ backgroundColor: "red", borderRadius: "1.5rem" }}
      >
        <Card.Text>
          {brewery.city || " "} {brewery.street || " "}
        </Card.Text>
        <Card.Text>Phone: {" " + brewery.phone || " "}</Card.Text>
        <Card.Link
          href={brewery.website_url}
          style={{ color: "black", cursor: "pointer" }}
        >
          {brewery.website_url || " "}
        </Card.Link>
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
      <Card.Text>
        <span
          title='show as is in server'
          onClick={toggleAsIs}
          style={{ cursor: "pointer" }}
        >
          <TfiServer />
        </span>
      </Card.Text>
      <div
        style={{
          display: showAsIs === false ? "none" : "initial",
          position: "fixed",
          backgroundColor: "white",
          zIndex: "10",
          bottom: "5rem",
          left: "5rem",
          right: "5rem",
          top: "5rem",
          padding: "1rem",
          borderRadius: "0.5rem",
          overflow: "auto",
        }}
      >
        <span
          style={{
            fontSize: "1.3rem",
            display: "flex",
            alignItems: "ceter",
            justifyContent: "end",
            cursor: "pointer",
          }}
          onClick={toggleAsIs}
        >
          X
        </span>
        {Object.keys(brewery).map((key) => (
          <div key={key}>
            {key}: {brewery[key]}
          </div>
        ))}
      </div>
    </Card>
  );
};

export default BreweryCard;
