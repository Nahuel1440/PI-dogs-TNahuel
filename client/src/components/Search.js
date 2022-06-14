import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import useQuery from "../hooks/useQuery";
import { getAllBreeds } from "../redux/actions";
import Cards from "./Cards";
import FilterOption from "./FilterOptions";
import Navigator from "./Navigator";

export default function Search() {
  const querys = useQuery(),
    currentPage = Number(querys["page"]) || 0,
    dispatch = useDispatch();

  //Deberia ejecutarse solo una vez
  useEffect(() => {
    dispatch(getAllBreeds());
  }, [dispatch]);

  return (
    <Div>
      <div className="searchBar">
        <h2>Search Breeds</h2>
        <input type="text" />
      </div>
      <Conteiner>
        <FilterOption />
        <Section>
          <Cards currentPage={currentPage} />
          <Navigator currentPage={currentPage} />
        </Section>
      </Conteiner>
    </Div>
  );
}

const Div = styled.div`
  padding: 80px 0 10px 0;
  margin: 0 60px 0 60px;
  @media screen and (max-width: 700px) {
    font-size: 15px;
  }
  .searchBar {
    display: flex;
    justify-content: space-between;
    input {
      align-self: center;
      padding-left: 5px;
      padding: 5px 7px 5px 7px;
    }
    @media screen and (max-width: 700px) {
      flex-direction: column;
    }
  }
`;
const Conteiner = styled.div`
  display: flex;
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
/*export default function Search() {
  const [filter, setFilter] = useState({
    sort: "name",
    order: "ascendent",
    type: "all",
  });
  const querys = useQuery(),
    currentPage = Number(querys["page"]) || 0,
    dispatch = useDispatch();

  //Deberia ejecutarse solo una vez
  useEffect(() => {
    dispatch(getAllBreeds());
  }, [dispatch]);

  //deberia ejecutarse cuando se cambie filter
  useEffect(() => {
    if (filter.sort === "name") {
      dispatch(orderBreedsByName(filter));
    } else {
      dispatch(orderBreedsByWeight(filter));
    }
  }, [filter, dispatch]);
  //Porque necesita usar a dispatch como dependencia???

  const handleChange = (e) => {
    setFilter({
      ...filter,
      [e.target.name]: e.target.value,
    });
  }; */
