import React from "react";
import styled from "styled-components";

export default function Search() {
  return (
    <Section>
      <h1>Search Breeds</h1>
      {/* <h2>You can search any breed that exist and noexist</h2> */}
      <Conteiner>
        <div className="filterDiv">
          <h3>Filter options</h3>
          <span>Sort by: </span>
          <form action="">
            <div>
              <input type="radio" name="sort" id="name" defaultChecked={true} />
              <label htmlFor="name">Name</label>
            </div>
            <div>
              <input type="radio" name="sort" id="weight" />
              <label htmlFor="weight">Weight</label>
            </div>
          </form>
          <hr />
          <span>Order: </span>
          <form action="">
            <div>
              <input
                type="radio"
                name="order"
                id="ascendent"
                defaultChecked={true}
              />
              <label htmlFor="ascendent">Ascendent</label>
            </div>
            <div>
              <input type="radio" name="order" id="descendent" />
              <label htmlFor="descendent">Descendent</label>
            </div>
          </form>
          <hr />
          <span>Type Breed: </span>
          <form action="">
            <div>
              <input
                type="radio"
                name="typeBreed"
                id="all"
                defaultChecked={true}
              />
              <label htmlFor="all">All</label>
            </div>
            <div>
              <input type="radio" name="typeBreed" id="exist" />
              <label htmlFor="exist">Exist</label>
            </div>
            <div>
              <input type="radio" name="typeBreed" id="noexist" />
              <label htmlFor="noexist">No-exist</label>
            </div>
          </form>
        </div>
        <div></div>
      </Conteiner>
    </Section>
  );
}

const Section = styled.section`
  padding: 74px 0 10px 0;
  margin: 0px 60px 0px 60px;
  h1 {
    text-align: start;
  }
  @media screen and (max-width: 700px) {
    font-size: 15px;
  }
`;
const Conteiner = styled.div`
  display: flex;
  border: solid 1px white;
  .filterDiv {
    //En movil seguramente ocupara todo el largo
    padding: 0 20px 0 20px;
    max-width: 20%;
    background-color: rgba(255, 255, 255, 0.2);
  }
  form {
    display: flex;
    flex-direction: column;
  }
  @media screen and (max-width: 700px) {
    flex-direction: column;
  }
`;
