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
        <h1>Breed Form</h1>
        <FormBreed />
      </FormConteiner>
    </MainConteiner>
  );
}
const MainConteiner = styled.div`
  display: flex;
  padding-top: 120px;
  margin: 0 60px 0 60px;
  justify-content: space-evenly;
`;
const FormConteiner = styled.div`
  width: 60%;
  border: 2px solid white;
  text-align: center;
  h1 {
    color: white;
  }
  @media screen and (max-width: 700px) {
    width: 100%;
  }
`;
