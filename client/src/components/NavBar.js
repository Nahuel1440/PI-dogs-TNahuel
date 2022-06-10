import React, { useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

export default function NavBar() {
  const [clicked, setClicked] = useState(false);
  return (
    <Div>
      <Header>
        <a href="/">
          Dogs <span>Page</span>
        </a>
        <ButtonMenu onClick={() => setClicked(!clicked)}>
          {clicked ? "x" : "|||"}
        </ButtonMenu>
      </Header>
      <Menu className={clicked ? "active" : ""}>
        <ul>
          <li>
            <Link to="/" onClick={() => setClicked(!clicked)}>
              Home
            </Link>
          </li>
          <li>
            <Link to="/search" onClick={() => setClicked(!clicked)}>
              Breeds
            </Link>
          </li>
          <li>
            <Link to="/create" onClick={() => setClicked(!clicked)}>
              Create Breeds
            </Link>
          </li>
        </ul>
      </Menu>
    </Div>
  );
}

const Header = styled.header`
  display: flex;
  justify-content: space-between;
  top: 20px;
  width: 100%;
  padding: 0px 24px;
  position: fixed;
  background-color: transparent;
  z-index: 3;
  & a {
    text-decoration: none;
    font-size: 25px;
    font-weight: 690;
  }
`;

const ButtonMenu = styled.button`
  transform: rotate(90deg);
  color: white;
  background-color: rgba(255, 255, 255, 0.2);
  border: none;
  width: 35px;
  height: 35px;
  font-size: 20px;
  padding-bottom: 4px;
  cursor: pointer;
  &:hover {
    background-color: transparent;
    border: 1px solid white;
  }
`;

const Menu = styled.nav`
  height: 100%;
  background-color: black;
  position: fixed;
  right: 0;
  z-index: 2;
  width: 0px;
  transition: all 0.5s ease;
  & ul {
    list-style: none;
    padding: 40px 40px;
    li > a {
      text-align: left;
      display: block;
      text-decoration: none;
      border-bottom: 1px solid white;
      line-height: 50px;
    }
  }
`;

const Div = styled.div`
  .active {
    width: 300px;
  }
`;
