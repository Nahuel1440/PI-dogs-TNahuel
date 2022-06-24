/* eslint-disable import/no-extraneous-dependencies */
const { expect } = require("chai");
const session = require("supertest-session");
const app = require("../../src/app.js");
const { Breed, conn } = require("../../src/db.js");

const agent = session(app);

//For test
const dog = {
  name: "Pug",
  height: "12 - 23",
  weight: "13 - 24",
};
const nameBreed = "bull";
const nameBreed2 = "bullsad";

describe("Routes", () => {
  before(() =>
    conn.authenticate().catch((err) => {
      console.error("Unable to connect to the database:", err);
    })
  );
  beforeEach(() => Breed.sync({ force: true }).then(() => Breed.create(dog)));
  describe("GET /dogs", () => {
    it("should get status code 200 and respond with more than 171 breeds", () =>
      agent
        .get("/dogs")
        .expect(200)
        .expect("Content-Type", /json/)
        .expect((res) => expect(res.body.length).to.be.greaterThan(171)));
  });
  describe("GET /dogs?name=", () => {
    it("should get 200 and respond with less than 171 breeds", () =>
      agent
        .get(`/dogs?name=${nameBreed}`)
        .expect(200)
        .expect("Content-Type", /json/)
        .expect((res) => expect(res.body.length).to.be.lessThan(171)));
    it("should get 404 if no exist any breed with that name", () =>
      agent.get(`/dogs?name=${nameBreed2}`).expect(404));
  });
  describe("GET /dogs/:id", () => {
    it("should get 200 and respond with the breed that has id iqual to 3", () =>
      agent
        .get(`/dogs/3`)
        .expect(200)
        .expect("Content-Type", /json/)
        .expect((res) => expect(res.body.id).to.eql(3)));
  });
  describe("POST /dogs", () => {
    it("should return status 400 if name is not send", () =>
      agent
        .post(`/dogs`)
        .send({ height: "12 - 23", weight: "12 - 45" })
        .expect(400));

    it("should return status 400 if height is not send", () =>
      agent.post(`/dogs`).send({ name: "dog", weight: "12 - 45" }).expect(400));

    it("should return status 400 if weight is not send", () =>
      agent.post(`/dogs`).send({ name: "dog", height: "12 - 23" }).expect(400));

    it("must add a new race and respond with 201 if valid data was sent", () =>
      agent
        .post(`/dogs`)
        .send({ name: "dog", height: "12 - 23", weight: "12 - 45" })
        .expect(201)
        .expect((res) =>
          expect(res.body).to.contain({
            name: "Dog",
            height: "12 - 23",
            weight: "12 - 45",
          })
        ));
  });
});
