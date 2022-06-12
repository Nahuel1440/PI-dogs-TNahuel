import React from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import Card from "./Card";

export default function Cards({ currentPage }) {
  const breeds = useSelector((state) => state.breeds);
  return (
    <CardsConteiner>
      {breeds.slice(8 * currentPage, 8 * currentPage + 8).map((breed) => (
        <Card
          key={breed.id}
          image={breed.image}
          name={breed.name}
          temperament={breed.temperament}
          weight={breed.weight}
        />
      ))}
    </CardsConteiner>
  );
}

const CardsConteiner = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: repeat(3, auto);
  gap: 30px 30px;
`;

/* const CardsConteiner = styled.div`
  display: flex;
  justify-content: space-evenly;
  flex-wrap: wrap;
`; */
