import React, { useEffect, useState } from "react";

import { Badge, Button, Container, Form, Nav, Navbar } from "react-bootstrap";
import { useBreweries } from "../Context/BreweriesContext";

const Header = () => {
  const { setShowFavorites, setShowSortedByDistance } = useBreweries();

  return (
    <Navbar bg='light' expand='lg' sticky='top'>
      <Container fluid>
        <Navbar.Brand
          style={{ cursor: "pointer" }}
          onClick={() => setShowFavorites(false)}
        >
          <Badge className='bg-success xl' style={{ fontSize: 24 }}>
            REEF Breweries
          </Badge>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls='navbarScroll' />
        <Navbar.Collapse id='navbarScroll'>
          <Nav
            className='me-auto my-2 my-lg-0'
            style={{ maxHeight: "100px" }}
            navbarScroll
          ></Nav>
          <div className='d-flex justify-content-start align-items-center flex-wrap gap-2'>
            <Button
              variant='outline-success'
              onClick={() => {
                setShowFavorites(false);
                setShowSortedByDistance(false);
              }}
            >
              All Breweries
            </Button>

            <Button
              variant='outline-success'
              onClick={() => {
                setShowFavorites(false);
                setShowSortedByDistance(true);
              }}
            >
              All Breweries sorted by distance
            </Button>
            <Button
              variant='outline-success'
              onClick={() => {
                setShowFavorites(true);
                setShowSortedByDistance(false);
              }}
            >
              Favorites
            </Button>
          </div>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;
