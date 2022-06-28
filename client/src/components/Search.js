import React, { useEffect, useState } from "react";
import { useRef } from "react";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import { getAllBreeds, getTemperaments } from "../redux/actions";
import Cards from "./Cards";
import FilterOption from "./FilterOptions";
import Navigator from "./Navigator";

export default function Search() {
  const [searchBreed, setSearchBreed] = useState("");
  const [currentPage, setCurrentPage] = useState(0);
  const [loading, setLoading] = useState(true);
  const refForm = useRef();
  const dispatch = useDispatch();

  //Deberia ejecutarse solo una vez
  useEffect(() => {
    dispatch(getAllBreeds()).then(() => setLoading(false));
    dispatch(getTemperaments());
  }, [dispatch]);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(getAllBreeds(searchBreed)).then(() => {
      setCurrentPage(0);
      refForm.current.reset();
    });
  };

  return (
    <Div>
      <div className="searchBar">
        <h2>Search Breeds</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Enter breed name"
            value={searchBreed}
            onChange={(e) => setSearchBreed(e.target.value)}
            pattern="[A-Za-z\s]{0,30}"
            onInvalid={(e) => {
              e.target.setCustomValidity(
                "The name breed should only contains letters."
              );
            }}
            onInput={(e) => e.target.setCustomValidity("")}
          />
        </form>
      </div>
      <Conteiner>
        <FilterOption
          setCurrentPage={setCurrentPage}
          refForm={refForm}
          loading={loading}
        />
        <Section>
          <Cards currentPage={currentPage} />
          <Navigator
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
          />
        </Section>
      </Conteiner>
    </Div>
  );
}

const Div = styled.div`
  padding: 70px 0 10px 0;
  margin: 0 60px 0 60px;
  @media screen and (max-width: 700px) {
    font-size: 15px;
    margin: 0 30px 0 30px;
  }
  .searchBar {
    display: flex;
    justify-content: space-between;
    form {
      align-self: center;
    }
    input {
      padding-left: 5px;
      padding: 5px 7px 5px 7px;
      &:invalid {
        border-color: red;
      }
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
