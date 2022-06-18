import React from "react";
import styled, { keyframes } from "styled-components";
import img2 from "../img/img2.jpg";
import img4 from "../img/img4.jpg";

export default function Home() {
  return (
    <>
      <Section style={{ backgroundImage: `url(${img2})` }}>
        <div style={{ zIndex: "1" }}>
          <header>
            <H1>Welcome the dogs page</H1>
          </header>
        </div>
      </Section>
      <Section style={{ backgroundImage: `url(${img4})` }}></Section>
      <Section style={{ backgroundImage: `url(${img2})` }}></Section>
    </>
  );
}
const fadeIn = keyframes`
    0%{
        opacity: 10;
    }
    100%{
        opacity: 0.2;
    }
`;
const Section = styled.section`
  display: flex;
  align-items: center;
  justify-content: center;
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
    background-attachment: scroll;
  }
  &::before {
    content: "";
    background-color: #000;
    height: 100%;
    width: 100%;
    left: 0;
    top: 0;
    opacity: 0.2;
    position: absolute;
    z-index: 0;
    animation: ${fadeIn} 5s ease-out;
  }
`;
const H1 = styled.h1`
  text-align: center;
  margin-bottom: 90px;
  font-size: 40px;
`;
