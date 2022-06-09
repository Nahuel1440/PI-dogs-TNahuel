import React from "react";
import styled from "styled-components";
import img2 from "../img/img2.jpg";
import img4 from "../img/img4.jpg";

export default function Home() {
  return (
    <>
      <Section style={{ backgroundImage: `url(${img2})` }}></Section>
      <Section style={{ backgroundImage: `url(${img4})` }}></Section>
      <Section style={{ backgroundImage: `url(${img2})` }}></Section>
      <Section style={{ backgroundImage: `url(${img4})` }}></Section>
    </>
  );
}

const Section = styled.section`
  background-position: center;
  background-size: cover;
  background-attachment: fixed;
  background-repeat: no-repeat;
  height: 100%;
  min-height: 100vh;
  position: relative;
  overflow: hidden;
  border-top: 0;
  @media screen and (max-width: 700px) {
    /* background-attachment: scroll; */
  }
  &::before {
    content: "";
    background-color: #000;
    display: block;
    height: 100%;
    width: 100%;
    left: 0;
    top: 0;
    opacity: 0.2;
    position: absolute;
  }
`;
