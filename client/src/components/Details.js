import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getBreed } from "../redux/actions";
import styled from "styled-components";
import { Link } from "react-router-dom";
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
          <Link to="/search">
            <button>🢀</button>
          </Link>
          <img src={breed.image} alt="None" />
          <div className="infoConteiner">
            <h1>{breed.name}</h1>
            <div>
              <span>
                <b>Height: </b>
                <br />
                {breed.height} cm
              </span>
            </div>
            <br />
            <div>
              <span>
                <b>Weight: </b>
                <br />
                {breed.weight} kg
              </span>
            </div>
            <br />
            <div>
              <span>
                <b>Life Expectancy: </b>
                <br />
                {breed.life_span ? breed.life_span : "Under investigation."}
              </span>
            </div>
            <br />
            <div>
              <span>
                <b>Temperaments: </b>
                <br />
                {breed.temperament ? breed.temperament : "Under investigation."}
              </span>
            </div>
          </div>
        </CardDetails>
      </MainConteiner>
    </>
  );
}

const MainConteiner = styled.div`
  padding-top: 160px;
  margin: 0 180px 0 180px;
  @media screen and (max-width: 700px) {
    margin: 0 20px 0 20px;
  }
`;

const CardDetails = styled.div`
  display: flex;
  border: solid 2px white;
  border-radius: 5px;
  .infoConteiner {
    padding: 10px 30px 30px 30px;
  }
  img {
    text-align: center;
    height: 400px;
    width: 50%;
    object-fit: cover;
    border-radius: 5px 0 0 5px;
  }
  @media screen and (max-width: 700px) {
    .infoConteiner {
      font-size: 12px;
    }
    img {
      height: 360px;
    }
  }
  button {
    position: absolute;
    height: 35px;
    width: 35px;
    background-color: rgba(0, 0, 0, 0.5);
    border: none;
    border-bottom: 2px solid white;
    border-right: 2px solid white;
    cursor: pointer;
    color: white;
    &:hover {
      background-color: black;
    }
  }
`;
