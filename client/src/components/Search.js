import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { getAllBreeds } from "../redux/actions";
import Cards from "./Cards";

export default function Search() {
  const dispatch = useDispatch();
  const breeds = useSelector((state) => state.breeds);

  useEffect(() => {
    dispatch(getAllBreeds());
  }, [dispatch]);
  //Porque necesita usar a dispatch como dependencia???

  return (
    <Div>
      <h2>Search Breeds</h2>
      {/* <h2>You can search any breed that exist and noexist</h2> */}
      {/* Ver si es necesario poner Este conteiner o puedo con flex organizar todo sin el*/}
      <Conteiner>
        <aside className="filterOp">
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
        </aside>
        <Section>
          <input type="text" />
          <Cards />
          <div style={{ height: "100px" }}>
            <a href=""></a>
            <a href=""></a>
            <a href=""></a>
            <a href=""></a>
            <a href=""></a>
          </div>
        </Section>
      </Conteiner>
    </Div>
  );
}

const Div = styled.div`
  padding: 80px 0 10px 0;
  margin: 0px 60px 0px 60px;
  @media screen and (max-width: 700px) {
    font-size: 15px;
  }
`;
const Conteiner = styled.div`
  display: flex;
  .filterOp {
    margin-right: 30px;
    padding: 0 20px 20px 20px;
    width: 15%;
    background-color: rgba(255, 255, 255, 0.2);
    @media screen and (max-width: 700px) {
      width: 100%;
    }
  }
  form {
    display: flex;
    flex-direction: column;
  }
  @media screen and (max-width: 700px) {
    flex-direction: column;
  }
`;
const Section = styled.section`
  display: flex;
  flex-direction: column;
  width: 100%;
  input {
    margin: 10px 0 10px 0;
    align-self: center;
  }
`;
// const Conteiner = styled.div`
//   display: flex;
//   border: solid 1px white;
//   .filterOp {
//     border: solid 1px white;
//     padding: 0 20px 20px 20px;
//     max-width: 20%;
//     background-color: rgba(255, 255, 255, 0.2);
//     @media screen and (max-width: 700px) {
//       max-width: 100%;
//     }
//   }
//   form {
//     display: flex;
//     flex-direction: column;
//   }
//   @media screen and (max-width: 700px) {
//     flex-direction: column;
//   }
// `;
