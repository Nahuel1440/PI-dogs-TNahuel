import React, { Fragment, useState } from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import postBreed from "../services/postBreed";

export default function FormBreed() {
  const [form, setForm] = useState({
    name: "",
    weight_min: "",
    weight_max: "",
    height_min: "",
    height_max: "",
    life_min: "",
    life_max: "",
    image: "",
    temperaments: [],
  });
  const temperaments = useSelector((state) => state.temperaments);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };
  const handleCheck = (e) => {
    const tempId = Number(e.target.value),
      includeInForm = form.temperaments.includes(tempId);
    if (!includeInForm) {
      setForm({
        ...form,
        temperaments: [...form.temperaments, tempId],
      });
    } else {
      setForm({
        ...form,
        temperaments: form.temperaments.filter((temp) => temp !== tempId),
      });
    }
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    const data = {
      name: form.name,
      weight: `${form.weight_min} - ${form.weight_max}`,
      height: `${form.height_min} - ${form.height_max}`,
    };
    if (form.life_min && form.life_max)
      data["life_span"] = `${form.life_min} - ${form.life_max} years`;
    if (form.image) data["image"] = form.image;
    if (form.temperaments.length > 0) data["ids"] = form.temperaments;
    postBreed(data);
  };

  return (
    <Form onSubmit={handleSubmit}>
      <div className="itemForm">
        <label htmlFor="">Name</label>
        <div>
          <input
            type="text"
            id="name"
            className="inputText"
            name="name"
            value={form.name}
            onChange={handleChange}
          />
        </div>
        <hr />
      </div>
      <div className="itemForm">
        <label htmlFor="">Weight(kg)</label>
        <div className="dualInputConteiner">
          <div>
            <input
              type="text"
              placeholder="Min"
              className="inputText"
              name="weight_min"
              value={form.weight_min}
              onChange={handleChange}
            />
            <hr />
          </div>
          <div>
            <input
              type="text"
              placeholder="Max"
              className="inputText"
              name="weight_max"
              value={form.weight_max}
              onChange={handleChange}
            />
            <hr />
          </div>
        </div>
      </div>
      <div className="itemForm">
        <label htmlFor="">Height(cm)</label>
        <div className="dualInputConteiner">
          <div>
            <input
              type="text"
              className="inputText"
              placeholder="Min"
              name="height_min"
              value={form.height_min}
              onChange={handleChange}
            />
            <hr />
          </div>
          <div>
            <input
              type="text"
              className="inputText"
              placeholder="Max"
              name="height_max"
              value={form.height_max}
              onChange={handleChange}
            />
            <hr />
          </div>
        </div>
      </div>
      <div className="itemForm">
        <label htmlFor="">Life Expectancy</label>
        <div className="dualInputConteiner">
          <div>
            <input
              type="text"
              className="inputText"
              placeholder="Min"
              name="life_min"
              value={form.life_min}
              onChange={handleChange}
            />
            <hr />
          </div>
          <div>
            <input
              type="text"
              className="inputText"
              placeholder="Max"
              name="life_max"
              value={form.life_max}
              onChange={handleChange}
            />
            <hr />
          </div>
        </div>
      </div>
      <div className="itemForm">
        <label htmlFor="">Image</label>
        <div>
          <input
            className="inputText"
            type="text"
            id="name"
            placeholder="URL"
            name="image"
            value={form.image}
            onChange={handleChange}
          />
        </div>
        <hr />
      </div>
      <div className="itemForm">
        <label htmlFor="">Temperaments</label>
        <div className="multipleOpt">
          {temperaments.map((temperament) => (
            <Fragment key={temperament.id}>
              <input
                type="checkbox"
                value={temperament.id}
                id={temperament.id}
                onChange={handleCheck}
              />
              <label htmlFor={temperament.id}>{temperament.name}</label>
              <br />
            </Fragment>
          ))}
        </div>
      </div>
      <div className="buttonConteiner">
        <button>Submit</button>
      </div>
    </Form>
  );
}

const Form = styled.form`
  margin-top: 50px;
  display: flex;
  flex-direction: column;
  .inputText {
    width: 100%;
    font-size: 17px;
    color: white;
    background-color: transparent;
    border: none;
    &:focus {
      outline: none;
    }
  }
  .itemForm {
    font-size: 17px;
    margin-top: 30px;
    align-self: center;
    width: 90%;
    text-align: start;
  }
  .dualInputConteiner {
    margin-top: 15px;
    display: flex;
    justify-content: space-between;
    div {
      display: inline-block;
      width: 47%;
    }
  }
  .multipleOpt {
    color: white;
    border: 2px solid #ccc;
    width: 100%;
    height: 100px;
    overflow-y: scroll;
  }
  .buttonConteiner {
    height: 30px;
    display: flex;
    justify-content: center;
    align-items: center;
    button {
    }
  }
`;
