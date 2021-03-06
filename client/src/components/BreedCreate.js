import React, { useEffect } from "react";
import styled from "styled-components";
import FormBreed from "./FormBreed";
import { useDispatch } from "react-redux";
import { getTemperaments } from "../redux/actions";
export default function BreedCreate() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getTemperaments());
  }, [dispatch]);

  return (
    <MainConteiner>
      <FormConteiner>
        <h2> Breed Form </h2>
        <FormBreed />
      </FormConteiner>
    </MainConteiner>
  );
}

const MainConteiner = styled.div`
  display: flex;
  padding: 95px 0 50px 0;
  margin: 0 60px 0 60px;
  justify-content: space-evenly;
  @media screen and (max-width: 700px) {
    margin: 0 20px 0 20px;
    padding: 90px 0 50px 0;
  }
`;
const FormConteiner = styled.div`
  width: 60%;
  background-color: rgba(0, 0, 0, 0.6);
  border: 2px solid white;
  text-align: center;
  input[type="text"] {
    font-size: inherit;
  }
  span {
    font-size: 13px;
  }
  @media screen and (max-width: 700px) {
    width: 100%;
  }
`;
