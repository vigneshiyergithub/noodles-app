import React from "react";
import { Navbar, Container } from "react-bootstrap";

const Header = ({ page }) => {
  return (
    <Navbar bg="light" fluid>
      <Container>
        <Navbar.Brand href="/">
          Noodles Webapp{page ? `- ${page}` : ""}
        </Navbar.Brand>
      </Container>
    </Navbar>
  );
};

export default Header;
