import React, { Fragment, useState } from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import validate from "../helpers/formValidate";
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
  const [errors, setErrors] = useState({});
  const temperaments = useSelector((state) => state.temperaments);

  const handleChange = (e) => {
    const { name, value } = e.target,
      newForm = { ...form, [name]: value };
    setForm(newForm);
    setErrors(validate(newForm));
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
    const err = validate(form);
    setErrors(err);
    if (Object.keys(err).length === 0) {
      const data = {
        name: form.name,
        weight: `${form.weight_min} - ${form.weight_max}`,
        height: `${form.height_min} - ${form.height_max}`,
      };
      if (form.life_min && form.life_max) {
        data["life_span"] = `${form.life_min} - ${form.life_max} years`;
      } else if (form.life_min) {
        data["life_span"] = `${form.life_min} years`;
      }
      if (form.image) data["image"] = form.image;
      if (form.temperaments.length > 0) data["ids"] = form.temperaments;
      postBreed(data);
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <div className={errors.name ? "itemForm invalid" : "itemForm"}>
        <label htmlFor="">
          Name {errors.name ? <span>{`${errors.name}`}</span> : ""}
        </label>
        <div>
          <div className="dualInputConteiner">
            <input
              type="text"
              id="name"
              name="name"
              value={form.name}
              onChange={handleChange}
              /* required={true}
            pattern="[A-Za-z\s]{1,30}"
            onInvalid={(e) => {
              e.target.value === ""
                ? e.target.setCustomValidity("The name is required.")
                : e.target.setCustomValidity(
                    "The name should only contains letters."
                  );
            }}
            onInput={(e) => e.target.setCustomValidity("")} */
            />
          </div>
        </div>
        <hr />
      </div>
      <div className="itemForm">
        <label htmlFor="">
          Weight(kg)
          {errors.weight_min ? <span> {`${errors.weight_min}`}</span> : ""}
          {errors.weight_min && errors.weight_max ? <span> | </span> : ""}
          {errors.weight_max ? <span> {`${errors.weight_max}`}</span> : ""}
        </label>
        <div className="dualInputConteiner">
          <div className={errors.weight_min ? "invalid" : ""}>
            <input
              type="text"
              placeholder="Min"
              name="weight_min"
              value={form.weight_min}
              onChange={handleChange}
              /* required={true}
              pattern="[0-9]{1,10}"
              onInvalid={(e) => {
                e.target.value === ""
                  ? e.target.setCustomValidity("The weight-min is required.")
                  : e.target.setCustomValidity(
                      "The weight should only contains numbers."
                    );
              }}
              onInput={(e) => e.target.setCustomValidity("")} */
            />
            <hr />
          </div>
          <div className={errors.weight_max ? "invalid" : ""}>
            <input
              type="text"
              placeholder="Max"
              name="weight_max"
              value={form.weight_max}
              onChange={handleChange}
              /* required={true}
              pattern="[0-9]{1,10}"
              onInvalid={(e) => {
                e.target.value === ""
                  ? e.target.setCustomValidity("The weight-max is required.")
                  : e.target.setCustomValidity(
                      "The weight should only contains numbers."
                    );
              }}
              onInput={(e) => e.target.setCustomValidity("")} */
            />
            <hr />
          </div>
        </div>
      </div>
      <div className="itemForm">
        <label>
          Height(cm)
          {errors.height_min ? <span> {`${errors.height_min}`}</span> : ""}
          {errors.height_min && errors.height_max ? <span> | </span> : ""}
          {errors.height_max ? <span> {`${errors.height_max}`}</span> : ""}
        </label>
        <div className="dualInputConteiner">
          <div className={errors.height_min ? "invalid" : ""}>
            <input
              type="text"
              placeholder="Min"
              name="height_min"
              value={form.height_min}
              onChange={handleChange}
              /* required={true}
              pattern="[0-9]{1,10}"
              onInvalid={(e) => {
                e.target.value === ""
                  ? e.target.setCustomValidity("The height-min is required.")
                  : e.target.setCustomValidity(
                      "The height should only contains numbers."
                    );
              }}
              onInput={(e) => e.target.setCustomValidity("")} */
            />
            <hr />
          </div>
          <div className={errors.height_max ? "invalid" : ""}>
            <input
              type="text"
              placeholder="Max"
              name="height_max"
              value={form.height_max}
              onChange={handleChange}
              /* required={true}
              pattern="[0-9]{1,10}"
              onInvalid={(e) => {
                e.target.value === ""
                  ? e.target.setCustomValidity("The height-max is required.")
                  : e.target.setCustomValidity(
                      "The height should only contains numbers."
                    );
              }}
              onInput={(e) => e.target.setCustomValidity("")} */
            />
            <hr />
          </div>
        </div>
      </div>
      <div
        className={
          errors.life_max || errors.life_min ? "itemForm invalid" : "itemForm"
        }
      >
        <label>
          Life Expectancy
          {errors.life_min ? <span> {`${errors.life_min}`}</span> : ""}
          {errors.life_min && errors.life_max ? <span> | </span> : ""}
          {errors.life_max ? <span> {`${errors.life_max}`}</span> : ""}
        </label>
        <div className="dualInputConteiner">
          <div>
            <input
              type="text"
              placeholder="Min"
              name="life_min"
              value={form.life_min}
              onChange={handleChange}
              /* pattern="[0-9]{1,10}" */
            />
            <hr />
          </div>
          <div>
            <input
              type="text"
              placeholder="Max"
              name="life_max"
              value={form.life_max}
              onChange={handleChange}
              /* pattern="[0-9]{1,10}" */
            />
            <hr />
          </div>
        </div>
      </div>
      <div className={errors.image ? "itemForm invalid" : "itemForm"}>
        <label>
          Image
          {errors.image ? <span> {`${errors.image}`}</span> : ""}
        </label>
        <div>
          <div className="dualInputConteiner">
            <input
              type="text"
              placeholder="URL"
              name="image"
              value={form.image}
              onChange={handleChange}
              /* pattern="https://.+"
            onInvalid={(e) => {
              e.target.setCustomValidity(
                "The url must match the following format: https://example"
              );
            }}
            onInput={(e) => e.target.setCustomValidity("")} */
            />
          </div>
        </div>
        <hr />
      </div>
      <div className="itemForm">
        <label htmlFor="">Temperaments</label>
        <div className="multipleOptConteiner">
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
      <div>
        <input
          disabled={Object.keys(errors).length > 0 ? true : false}
          type="submit"
          value={"Create"}
        />
      </div>
    </Form>
  );
}

const Form = styled.form`
  margin-top: 10px;
  display: flex;
  flex-direction: column;
  span {
    color: red;
  }
  input[type="text"] {
    width: 100%;
    color: white;
    background-color: transparent;
    border: none;
    &:focus {
      outline: none;
    }
  }
  input[type="submit"] {
    margin: 20px 0px 20px 0;
    width: 75px;
    height: 30px;
    background-color: rgba(70, 70, 70, 255);
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    &:hover {
      background-color: transparent;
      border: solid 1px white;
    }
  }
  .invalid {
    hr {
      border-color: red;
    }
  }
  .itemForm {
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
  .multipleOptConteiner {
    border: 2px solid #ccc;
    width: 100%;
    height: 100px;
    overflow-y: scroll;
  }
  .buttonConteiner {
    display: flex;
    justify-content: center;
    align-items: center;
  }
`;
