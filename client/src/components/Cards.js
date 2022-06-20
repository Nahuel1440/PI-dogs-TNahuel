import React from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import Card from "./Card";

export default function Cards({ currentPage }) {
  const breeds = useSelector((state) => state.breeds);
  return (
    <>
      {breeds.length !== 0 ? (
        <CardsConteiner>
          {breeds.slice(8 * currentPage, 8 * currentPage + 8).map((breed) => (
            <Card
              id={breed.id}
              key={breed.id}
              image={breed.image}
              name={breed.name}
              temperament={breed.temperament}
              weight={breed.weight}
            />
          ))}
        </CardsConteiner>
      ) : (
        <div style={{ textAlign: "center" }}>
          <h2>No found any breed</h2>
        </div>
      )}
    </>
  );
}

const CardsConteiner = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: repeat(3, auto);
  gap: 30px 30px;
  @media screen and (max-width: 700px) {
    grid-template-columns: repeat(1, 1fr);
    grid-template-rows: repeat(8, auto);
    padding-top: 30px;
  }
`;
