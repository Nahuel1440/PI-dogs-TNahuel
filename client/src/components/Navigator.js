import React from "react";
import styled from "styled-components";
import { useSelector } from "react-redux";
import arrowLeft from "../img/arrow-left-filter.png";
import arrowRight from "../img/arrow-right-filter.png";

const arrPageCreator = (currentPage, cantPages) => {
  const arr = [],
    lastPage = cantPages - 1;
  for (let i = 0; i < cantPages; i++) {
    if (i === 0) {
      arr.push(i);
      if (currentPage > 3) arr.push("...");
    } else if (i === lastPage) {
      if (currentPage <= lastPage - 4) arr.push("...");
      arr.push(i);
    } else if (
      (i >= 1 && i <= 3 && currentPage <= 3) ||
      (i <= lastPage - 1 && i >= lastPage - 3 && currentPage >= lastPage - 3)
    ) {
      arr.push(i);
    } else {
      if (i === currentPage - 1 || i === currentPage) arr.push(i);
      else if (i === currentPage + 1) {
        arr.push(i);
      }
    }
  }
  return arr;
};

export default function Navigator({ currentPage, setCurrentPage, loading }) {
  const breeds = useSelector((state) => state.breeds);
  //modularizar
  const cantPages = Math.ceil(breeds.length / 8),
    arrPages = arrPageCreator(currentPage, cantPages);

  const handlePage = (page) => {
    setCurrentPage(page);
    window.scrollTo(0, 0);
  };

  return (
    <Conteiner>
      {!loading ? (
        <ul>
          {cantPages > 0 && currentPage > 0 ? (
            <li key={"prev"}>
              <button
                className={"prev"}
                onClick={() => handlePage(currentPage - 1)}
              >
                <img src={arrowLeft} alt="" />
              </button>
            </li>
          ) : null}
          {arrPages.map((page, i) => (
            <li key={i}>
              {page !== "..." ? (
                <button
                  onClick={() => handlePage(page)}
                  className={currentPage === page ? "active" : ""}
                >
                  {page}
                </button>
              ) : (
                <button className="ellipsis">{page}</button>
              )}
            </li>
          ))}
          {cantPages > 0 && currentPage < cantPages - 1 ? (
            <li key={"next"}>
              <button
                className={"next"}
                onClick={() => handlePage(currentPage + 1)}
              >
                <img src={arrowRight} alt="" />
              </button>
            </li>
          ) : null}
        </ul>
      ) : null}
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
    li {
      display: inline;
    }
    button {
      background-color: transparent;
      border: none;
      padding-left: 10px;
      padding-right: 10px;
      font-size: 15px;
      font-family: sans-serif;
      cursor: pointer;
      @media screen and (min-width: 701px) {
        &:hover {
          background-color: rgba(255, 255, 255, 0.1);
        }
      }
    }
    .active {
      background-color: rgba(255, 255, 255, 0.1);
      pointer-events: none;
      cursor: default;
      font-weight: 600;
    }
    .ellipsis {
      font-size: 20px;
      font-weight: 200px;
      cursor: default;
      pointer-events: none;
      @media screen and (max-width: 700px) {
        padding-left: 0;
        padding-right: 0;
      }
    }
    .prev {
      margin-right: 10px;
      @media screen and (max-width: 700px) {
        margin-right: 2px;
      }
      img {
        height: 12px;
      }
    }
    .next {
      margin-left: 10px;
      @media screen and (max-width: 700px) {
        margin-left: 2px;
      }
      img {
        height: 12px;
      }
    }
  }
`;
