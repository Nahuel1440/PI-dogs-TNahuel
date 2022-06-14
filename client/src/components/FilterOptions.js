import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useDispatch } from "react-redux";
import { orderBreedsByName, orderBreedsByWeight } from "../redux/actions";

export default function FilterOption({ setCurrentPage }) {
  const [filter, setFilter] = useState({
    sort: "name",
    order: "ascendent",
    type: "all",
  });
  const dispatch = useDispatch();

  //deberia ejecutarse cuando se cambie filter
  useEffect(() => {
    if (filter.sort === "name") {
      dispatch(orderBreedsByName(filter));
    } else {
      dispatch(orderBreedsByWeight(filter));
    }
    /*  <NavLink to={`/search?page=0`}></NavLink>; */
  }, [filter, dispatch]);
  //Porque necesita usar a dispatch como dependencia???

  const handleChange = (e) => {
    setFilter({
      ...filter,
      [e.target.name]: e.target.value,
    });
    setCurrentPage(0);
  };

  return (
    <AsideBar>
      <h3>Filter options</h3>
      <span>Sort by: </span>
      <form action="">
        <div>
          <input
            type="radio"
            name="sort"
            id="name"
            value="name"
            defaultChecked={true}
            onChange={handleChange}
          />
          <label htmlFor="name">Name</label>
        </div>
        <div>
          <input
            type="radio"
            name="sort"
            id="weight"
            value="weight"
            onChange={handleChange}
          />
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
            value="ascendent"
            defaultChecked={true}
            onChange={handleChange}
          />
          <label htmlFor="ascendent">Ascendent</label>
        </div>
        <div>
          <input
            type="radio"
            name="order"
            id="descendent"
            value="descendent"
            onChange={handleChange}
          />
          <label htmlFor="descendent">Descendent</label>
        </div>
      </form>
      <hr />
      <span>Type Breed: </span>
      <form action="">
        <div>
          <input
            type="radio"
            name="type"
            id="all"
            defaultChecked={true}
            value="all"
            onChange={handleChange}
          />
          <label htmlFor="all">All</label>
        </div>
        <div>
          <input
            type="radio"
            name="type"
            id="exist"
            value="exist"
            onChange={handleChange}
          />
          <label htmlFor="exist">Exist</label>
        </div>
        <div>
          <input
            type="radio"
            name="type"
            id="noexist"
            value="noexist"
            onChange={handleChange}
          />
          <label htmlFor="noexist">No-exist</label>
        </div>
      </form>
    </AsideBar>
  );
}

const AsideBar = styled.aside`
  margin-right: 30px;
  padding: 0 20px 20px 20px;
  width: 15%;
  background-color: rgba(255, 255, 255, 0.2);
  @media screen and (max-width: 700px) {
    width: 100%;
  }
  form {
    display: flex;
    flex-direction: column;
  }
`;
