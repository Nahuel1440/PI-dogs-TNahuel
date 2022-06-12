import React from "react";
import styled from "styled-components";
import { useSelector } from "react-redux";

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
            <a href={`/search?page=${currentPage - 1}`}>{"<Prev"}</a>
          </li>
        ) : null}
        {arrPages.map((page, i) => (
          <li key={i}>
            <a href={`/search?page=${i}`}>{i}</a>
          </li>
        ))}
        {cantPages > 0 && currentPage < cantPages - 1 ? (
          <li key={"next"}>
            <a href={`/search?page=${currentPage + 1}`}>{"Next>"}</a>
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
      color: red;
    }
    li {
      display: inline;
    }
    a {
      text-decoration: none;
      padding-left: 10px;
      padding-right: 10px;

      &:hover {
        background-color: rgba(255, 255, 255, 0.2);
      }
    }
  }
`;
