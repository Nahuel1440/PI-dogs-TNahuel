import React from "react";
import styled from "styled-components";

export default function Card(props) {
  return (
    <ConteinerCard>
      <img src={props.image} alt="" width={300} height={300} />
      <p>{props.name}</p>
    </ConteinerCard>
  );
}

const ConteinerCard = styled.div`
  border-top-right-radius: 7px;
  border-top-left-radius: 7px;
  margin: 10px 0 10px 0;
  background-color: white;
  height: 330px;
  text-align: center;
  p {
    margin: 0;
  }
  img {
    border-top-right-radius: 7px;
    border-top-left-radius: 7px;
  }
`;
