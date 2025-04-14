import React, { useState } from "react";
import styled from "styled-components";
import "@fortawesome/fontawesome-free/css/all.min.css";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <Nav>
      <Logo>Green-Scope</Logo>

      {/* Menu Icon for Mobile View */}
      <MenuIcon onClick={toggleMenu}>
        <i className={`fas ${isMenuOpen ? "fa-times" : "fa-bars"}`}></i>
      </MenuIcon>

      {/* Navbar Links */}
      <NavLinks $isMenuOpen={isMenuOpen}>
  <NavItem>Home</NavItem>
  <NavItem>About</NavItem>
  <NavItem>Gallery</NavItem>
  <NavItem>Contact</NavItem>
</NavLinks>
    </Nav>
  );
};

const Nav = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #177245;
  padding: 1rem;
  flex-wrap: wrap;
`;

const Logo = styled.div`
  color: #fff;
  font-size: 1.5rem;
  font-weight: bold;

  @media (max-width: 425px) {
    font-size: 1.2rem;
  }

  @media (max-width: 375px) {
    font-size: 1rem;
  }

  @media (max-width: 325px) {
    font-size: 0.9rem;
  }
`;

const MenuIcon = styled.div`
  display: none;
  color: #fff;
  font-size: 1.5rem;
  cursor: pointer;

  @media (max-width: 768px) {
    display: block;
  }
`;

const NavLinks = styled.ul`
  display: flex;
  list-style-type: none;
  margin: 0;
  padding: 0;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: center;
    width: 100%;
    display: ${({ $isMenuOpen }) => ($isMenuOpen ? "flex" : "none")};
    background-color: #177245;
    position: absolute;
    top: 60px;
    left: 0;
  }
`;

const NavItem = styled.li`
  margin: 0 1rem;
  color: #fff;
  cursor: pointer;

  @media (max-width: 425px) {
    font-size: 0.9rem;
  }

  @media (max-width: 375px) {
    font-size: 0.8rem;
    margin: 0.3rem 0;
  }

  @media (max-width: 325px) {
    font-size: 0.7rem;
  }
`;

export default Navbar;
