import React, { Fragment, useEffect, useState } from "react";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import {
  filterByTemp,
  orderBreedsByName,
  orderBreedsByWeight,
} from "../redux/actions";

export default function FilterOption({ setCurrentPage }) {
  const [filter, setFilter] = useState({
    sort: "name",
    order: "ascendent",
    type: "all",
    temperaments: [],
  });
  const dispatch = useDispatch();
  const temperaments = useSelector((state) => state.temperaments);

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
    const tempName = e.target.value,
      includeInFilter = filter.temperaments.includes(tempName);
    if (!includeInFilter) {
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
    setCurrentPage(0);
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
            id="nameInput"
            value="name"
            defaultChecked={true}
            onChange={handleChange}
          />
          <label htmlFor="nameInput">Name</label>
        </div>
        <div>
          <input
            type="radio"
            name="sort"
            id="weightInput"
            value="weight"
            onChange={handleChange}
          />
          <label htmlFor="weightInput">Weight</label>
        </div>
      </div>
      <hr />
      <span>Order: </span>
      <div className="filterItem">
        <div>
          <input
            type="radio"
            name="order"
            id="ascendentInput"
            value="ascendent"
            defaultChecked={true}
            onChange={handleChange}
          />
          <label htmlFor="ascendentInput">Ascendent</label>
        </div>
        <div>
          <input
            type="radio"
            name="order"
            id="descendentInput"
            value="descendent"
            onChange={handleChange}
          />
          <label htmlFor="descendentInput">Descendent</label>
        </div>
      </div>
      <hr />
      <span>Type Breed: </span>
      <div className="filterItem">
        <div>
          <input
            type="radio"
            name="type"
            id="allInput"
            defaultChecked={true}
            value="all"
            onChange={handleChange}
          />
          <label htmlFor="allInput">All</label>
        </div>
        <div>
          <input
            type="radio"
            name="type"
            id="existInput"
            value="exist"
            onChange={handleChange}
          />
          <label htmlFor="existInput">Exist</label>
        </div>
        <div>
          <input
            type="radio"
            name="type"
            id="noExistInput"
            value="noexist"
            onChange={handleChange}
          />
          <label htmlFor="noExistInput">No-exist</label>
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
  border-radius: 5px;
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
