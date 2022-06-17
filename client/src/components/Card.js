import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
export default function Card(props) {
  return (
    <ConteinerCard>
      <Link to={`/details/${props.id}`}>
        <img src={props.image} alt="" />
        <div className="info">
          <span className="name">
            <b>{props.name}</b>
          </span>
          <hr />
          <div>
            <span>
              <b>Temperaments:</b> <br /> {props.temperament}.
            </span>
          </div>
          <div>
            <span>
              <b>Weight:</b> <br />
              {props.weight}kg
            </span>
          </div>
        </div>
      </Link>
    </ConteinerCard>
  );
}

const ConteinerCard = styled.div`
  display: flex;
  flex-direction: column;
  border-radius: 5px;
  cursor: pointer;
  background-color: rgba(25, 25, 25, 1);
  box-shadow: 0 8px 16px 0 rgba(0, 0, 0, 0.5);
  a {
    text-decoration: none;
  }
  img {
    width: 100%;
    height: 300px;
    border-top-right-radius: 5px;
    border-top-left-radius: 5px;
  }
  &:hover {
    box-shadow: 0 8px 16px 0 rgba(0, 0, 0, 1.5);
  }
  .info {
    padding: 10px;
    .name {
      font-size: 20px;
    }
    & > div {
      padding: 5px 0 5px 0;
    }
  }
  /*  @media screen and (max-width: 700px) {
    flex-direction: row;
  } */
`;
