import React from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import Card from "./Card";
export default function Cards() {
  const breeds = useSelector((state) => state.breeds);
  return (
    <CardsConteiner>
      {breeds.map((breed) => (
        <Card
          key={breed.id}
          image={breed.image}
          name={breed.name}
          temperaments={breed.temperaments}
          weight={breed.weight}
        />
      ))}
    </CardsConteiner>
  );
}

const CardsConteiner = styled.div`
  display: flex;
  justify-content: space-evenly;
  flex-wrap: wrap;
`;
