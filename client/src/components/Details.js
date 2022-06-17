import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getBreed } from "../redux/actions";
import styled from "styled-components";

export default function Details() {
  const { id } = useParams(),
    dispatch = useDispatch(),
    breed = useSelector((state) => state.breed);
  useEffect(() => {
    dispatch(getBreed(id));
  }, [dispatch, id]);
  return (
    <>
      <MainConteiner>
        <CardDetails>
          <img src={breed.image} alt="" />
        </CardDetails>
      </MainConteiner>
    </>
  );
}
const MainConteiner = styled.div`
  padding-top: 120px;
  margin: 0 60px 0 60px;
`;

const CardDetails = styled.div`
  display: flex;
  margin: 0 30px 0 30px;
  border: solid 1px white;
  height: 480px;
  border-radius: 30px;
  img {
    margin-left: 35px;
    align-self: center;
    height: 400px;
    width: 550px;
    border-radius: 30px;
  }
  @media screen and (max-width: 700px) {
    flex-direction: column;
  }
`;
