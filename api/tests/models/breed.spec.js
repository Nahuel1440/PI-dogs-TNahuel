const { Breed, conn } = require("../../src/db.js");
const { expect } = require("chai");

describe("Breed model", () => {
  before(() =>
    conn.authenticate().catch((err) => {
      console.error("Unable to connect to the database:", err);
    })
  );
  describe("Validators", () => {
    beforeEach(() => Breed.sync({ force: true }));

    describe("id", () => {
      it("The id must be of type uuid", (done) => {
        Breed.create({ name: "Pug", height: "23 - 43", weight: "12 - 43" })
          .then((breed) =>
            expect(breed.id).to.match(
              /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/
            )
          )
          .then(() => done())
          .catch(() => done(new Error("id must be of type uuid")));
      });
    });

    describe("name", () => {
      it("should throw an error if name is null", (done) => {
        Breed.create({ height: "23 - 43", weight: "12 - 43" })
          .then(() => done(new Error("not throw an error")))
          .catch(() => done());
      });
      it("should work when its a valid name", (done) => {
        Breed.create({ name: "Pug", height: "23 - 43", weight: "12 - 43" })
          .then(() => done())
          .catch((err) => done(err));
      });
      it("the first letter of the name must be transformed to uppercase if it is lowercase", (done) => {
        Breed.create({
          name: "pug",
          height: "23 - 43",
          weight: "12 - 43",
        })
          .then((breed) => expect(breed.name).to.equal("Pug"))
          .then(() => done())
          .catch(() =>
            done(new Error("The first letter of the name was not transformed"))
          );
      });
    });

    describe("weight", () => {
      it("should throw an error if weight is null", (done) => {
        Breed.create({ name: "Pug", height: "23 - 43" })
          .then(() => done(new Error("not throw an error")))
          .catch(() => done());
      });
      it("should work when its a valid weight", (done) => {
        Breed.create({ name: "Pug", height: "23 - 43", weight: "12 - 43" })
          .then(() => done())
          .catch((err) => done(err));
      });
    });

    describe("height", () => {
      it("should throw an error if height is null", (done) => {
        Breed.create({ name: "Pug", weight: "12 - 43" })
          .then(() => done(new Error("not throw an error")))
          .catch(() => done());
      });
      it("should work when its a valid height", (done) => {
        Breed.create({ name: "Pug", height: "23 - 43", weight: "12 - 43" })
          .then(() => done())
          .catch((err) => done(err));
      });
    });

    describe("life_span", () => {
      it("should work when its null", (done) => {
        Breed.create({ name: "Pug", height: "23 - 43", weight: "12 - 43" })
          .then(() => done())
          .catch(() => done(new Error("Throw an error if its null")));
      });
      it("should work when its not null", (done) => {
        Breed.create({
          name: "Pug",
          height: "23 - 43",
          weight: "12 - 43",
          life_span: "12 - 36 years",
        })
          .then(() => done())
          .catch((err) => done(err));
      });
    });

    describe("image", () => {
      it("should throw an error if its not valid URL", (done) => {
        Breed.create({
          name: "Pug",
          height: "23 - 43",
          weight: "12 - 43",
          image: "<script><script/>",
        })
          .then(() => done(new Error("not throw an error")))
          .catch(() => done());
      });
      it("should work when its a valid URL", (done) => {
        Breed.create({
          name: "Pug",
          height: "23 - 43",
          weight: "12 - 43",
          image: "https://example.com",
        })
          .then(() => done())
          .catch((err) => done(err));
      });
    });
  });
});
