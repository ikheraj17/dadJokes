import React from 'react';
import { Navbar, Nav, NavItem, NavDropdown } from 'react-bootstrap';

const MenuBar = () => {
    return (
        <div>
            <Navbar bg="light" expand="lg">
  <Navbar.Brand href="/profile">Dad Jokes For Days</Navbar.Brand>
  <Navbar.Toggle aria-controls="basic-navbar-nav" />
  <Navbar.Collapse id="basic-navbar-nav">
  <Nav className="mr-auto">
      <Nav.Link href="/">Logout</Nav.Link>
      <Nav.Link href="#link">Unsubscribe</Nav.Link>
    </Nav>
  </Navbar.Collapse>
</Navbar>
        </div>
    )
};

export default MenuBar;