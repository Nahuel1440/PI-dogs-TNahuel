import React from "react";
import styled from "styled-components";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";

export default function Navigator({ currentPage }) {
  const breeds = useSelector((state) => state.breeds);
  //modularizar
  const cantPages = Math.ceil(breeds.length / 8),
    arrPages = new Array(cantPages).fill(1);

  return (
    <Conteiner>
      <ul>
        {cantPages > 0 && currentPage > 0 ? (
          <li key={"prev"}>
            <NavLink
              to={`/search?page=${currentPage - 1}`}
              isActive={() => false}
              //Por qué al definir este elemento funciona automaticamente en todos los demas NavLink?
              onClick={window.scrollTo(0, 0)}
            >
              {"<Prev"}
            </NavLink>
          </li>
        ) : null}
        {arrPages.map((page, i) => (
          <li key={i}>
            <NavLink
              to={`/search?page=${i}`}
              isActive={() => (currentPage === i ? true : false)}
            >
              {i}
            </NavLink>
          </li>
        ))}
        {cantPages > 0 && currentPage < cantPages - 1 ? (
          <li key={"next"}>
            <NavLink
              to={`/search?page=${currentPage + 1}`}
              isActive={() => false}
            >
              {"Next>"}
            </NavLink>
          </li>
        ) : null}
      </ul>
    </Conteiner>
  );
}

const Conteiner = styled.div`
  height: 100px;
  text-align: center;
  ul {
    padding: 0px;
    display: inline-block;
    margin-top: 45px;
    .active {
      background-color: rgba(255, 255, 255, 0.1);
      pointer-events: none;
      cursor: default;
      font-weight: 600;
    }
    li {
      display: inline;
    }
    a {
      text-decoration: none;
      padding-left: 10px;
      padding-right: 10px;

      &:hover {
        background-color: rgba(255, 255, 255, 0.1);
      }
    }
  }
`;
