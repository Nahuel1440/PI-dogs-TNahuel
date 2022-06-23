const { Temperament, conn } = require("../../src/db.js");
const { expect } = require("chai");

describe("Temperament model", () => {
  before(() =>
    conn.authenticate().catch((err) => {
      console.error("Unable to connect to the database:", err);
    })
  );
  describe("Validators", () => {
    beforeEach(() => Temperament.sync({ force: true }));
    describe("id", () => {
      it("the id must be incremented from number 1", (done) => {
        Temperament.bulkCreate([{ name: "adaptable" }, { name: "happy" }])
          .then((tempers) =>
            expect([tempers[0].id, tempers[1].id]).to.eql([1, 2])
          )
          .then(() => done())
          .catch(() => done(new Error("ids not expected")));
      });
    });
    describe("name", () => {
      it("should throw an error if name is null", (done) => {
        Temperament.create({})
          .then(() => done(new Error("not throw an error")))
          .catch(() => done());
      });
      it("should work when if name is not null", (done) => {
        Temperament.create({ name: "wda" })
          .then(() => done())
          .catch((err) => done(err));
      });
    });
  });
});
