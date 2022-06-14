import React from "react";
import styled from "styled-components";
import { useSelector } from "react-redux";

export default function Navigator({ currentPage, setCurrentPage }) {
  const breeds = useSelector((state) => state.breeds);
  //modularizar
  const cantPages = Math.ceil(breeds.length / 8),
    arrPages = new Array(cantPages).fill(1);

  const handlePage = (page) => {
    setCurrentPage(page);
    window.scrollTo(0, 0);
  };

  return (
    <Conteiner>
      <ul>
        {cantPages > 0 && currentPage > 0 ? (
          <li key={"prev"}>
            <button onClick={() => handlePage(currentPage - 1)}>
              {"<Prev"}
            </button>
          </li>
        ) : null}
        {arrPages.map((page, i) => (
          <li key={i}>
            <button
              onClick={() => handlePage(i)}
              className={currentPage === i ? "active" : ""}
            >
              {i}
            </button>
          </li>
        ))}
        {cantPages > 0 && currentPage < cantPages - 1 ? (
          <li key={"next"}>
            <button onClick={() => handlePage(currentPage + 1)}>
              {"Next>"}
            </button>
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
    button {
      background-color: transparent;
      color: white;
      border: none;
      padding-left: 10px;
      padding-right: 10px;
      font-size: 15px;
      font-family: sans-serif;
      cursor: pointer;
      &:hover {
        background-color: rgba(255, 255, 255, 0.1);
      }
    }
  }
`;
