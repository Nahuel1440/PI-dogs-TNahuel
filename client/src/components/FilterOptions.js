import React, { Fragment, useEffect, useState } from "react";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import {
  filterByTemp,
  orderBreedsByName,
  orderBreedsByWeight,
} from "../redux/actions";

export default function FilterOption({ setCurrentPage }) {
  const temperaments = useSelector((state) => state.temperaments);
  const [filter, setFilter] = useState({
    sort: "name",
    order: "ascendent",
    type: "all",
    temperaments: [],
  });
  const dispatch = useDispatch();

  useEffect(() => {
    if (filter.sort === "name") {
      dispatch(orderBreedsByName(filter));
    } else {
      dispatch(orderBreedsByWeight(filter));
    }
    //Preguntar si entre el anterior filter y el actual se cambio solo temperaments o sort tambien
    if (filter.temperaments.length > 0) {
      dispatch(filterByTemp(filter.temperaments));
    }
  }, [filter, dispatch]);
  //Porque necesita usar a dispatch como dependencia???

  const handleChange = (e) => {
    setFilter({
      ...filter,
      [e.target.name]: e.target.value,
    });
    setCurrentPage(0);
  };

  const handleCheck = (e) => {
    const tempName = e.target.value;
    if (!filter.temperaments.includes(tempName)) {
      setFilter({
        ...filter,
        temperaments: [...filter.temperaments, tempName],
      });
    } else {
      setFilter({
        ...filter,
        temperaments: filter.temperaments.filter((temp) => temp !== tempName),
      });
    }
  };

  return (
    <AsideBar>
      <h3>Filter options</h3>
      <span>Sort by: </span>
      <div className="filterItem">
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
      </div>
      <hr />
      <span>Order: </span>
      <div className="filterItem">
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
      </div>
      <hr />
      <span>Type Breed: </span>
      <div className="filterItem">
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
      </div>
      <hr />
      <span>Temperaments: </span>
      <div className="filterItem">
        <div className="multipleOpt">
          {temperaments.map((temperament) => (
            <Fragment key={temperament.id}>
              <input
                type="checkbox"
                value={temperament.name}
                id={temperament.id}
                onChange={handleCheck}
              />
              <label htmlFor={temperament.id}>{temperament.name}</label>
              <br />
            </Fragment>
          ))}
        </div>
      </div>
    </AsideBar>
  );
}

const AsideBar = styled.aside`
  margin-right: 30px;
  padding: 0 20px 20px 20px;
  width: 20%;
  background-color: rgba(70, 70, 70, 255);
  z-index: 4;
  @media screen and (max-width: 700px) {
    width: 100%;
  }
  .filterItem {
    display: flex;
    flex-direction: column;
    margin-top: 3px;
  }
  .multipleOpt {
    color: white;
    border: 2px solid #ccc;
    width: 100%;
    height: 500px;
    overflow-y: scroll;
  }
`;
