import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { clearBreed, getBreed } from "../redux/actions";
import styled from "styled-components";
import { Link } from "react-router-dom";
import backImg from "../img/back-right.png";

export default function Details() {
  const { id } = useParams(),
    dispatch = useDispatch(),
    breed = useSelector((state) => state.breed);

  useEffect(() => {
    dispatch(getBreed(id));
    return () => {
      dispatch(clearBreed());
    };
  }, [dispatch, id]);

  return (
    <>
      <MainConteiner>
        <CardDetails>
          <Link to="/search">
            <input type="image" src={backImg} alt="arrow back" />
          </Link>
          {Object.keys(breed).length > 0 ? (
            <>
              <img src={breed.image} alt="None" />
              <div className="infoConteiner">
                <h2>{breed.name}</h2>
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
                    {breed.temperament
                      ? breed.temperament
                      : "Under investigation."}
                  </span>
                </div>
              </div>
            </>
          ) : (
            <div className="loading">
              <h2>Loading....</h2>
            </div>
          )}
        </CardDetails>
      </MainConteiner>
    </>
  );
}

const MainConteiner = styled.div`
  padding-top: 130px;
  margin: 0 180px 0 180px;
  @media screen and (max-width: 700px) {
    padding-top: 95px;
    margin: 0 20px 50px 20px;
  }
`;

const CardDetails = styled.div`
  display: flex;
  background-color: rgba(0, 0, 0, 0.2);
  border: solid 2px white;
  border-radius: 5px;
  min-height: 400px;
  img {
    text-align: center;
    width: 50%;
    object-fit: cover;
    aspect-ratio: 1.2/1;
  }
  input[type="image"] {
    padding: 8px;
    position: absolute;
    height: 35px;
    width: 35px;
    background-color: rgba(0, 0, 0, 0.5);
    border: none;
    border-bottom: 2px solid white;
    border-right: 2px solid white;
    cursor: pointer;
    &:hover {
      background-color: black;
    }
  }
  .infoConteiner {
    padding: 10px 30px 30px 30px;
  }
  @media screen and (max-width: 700px) {
    flex-direction: column;
    min-height: 300px;
    img {
      width: 100%;
    }
    .infoConteiner {
      padding: 0 10px 10px 10px;
      font-size: 15px;
    }
  }
  .loading {
    text-align: center;
    width: 100%;
    height: 100%;
  }
`;
