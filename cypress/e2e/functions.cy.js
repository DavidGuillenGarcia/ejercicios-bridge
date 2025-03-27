// cypress/e2e/math.cy.js
const {
  sum,
  subtract,
  multiply,
  divide,
  power,
  squareRoot,
} = require("../../calculator/JS/functions");

describe("Math functions", () => {
  context("Sum function", () => {
    it("sums successfully 2 positive numbers", () => {
      expect(sum(2, 3)).to.eq(5);
    });

    it("sums successfully 1 positive number and 1 negative number", () => {
      expect(sum(5, -2)).to.eq(3);
    });

    it("sums successfully 2 negative numbers", () => {
      expect(sum(-5, -2)).to.eq(-7);
    });
  });

  context("Subtract function", () => {
    it("substracts successfully 2 positive numbers", () => {
      expect(subtract(3, 3)).to.eq(0);
    });

    it("substracts successfully 1 positive number and 1 negative number", () => {
      expect(subtract(6, -3)).to.eq(9);
    });

    it("substracts successfully 2 negative numbers", () => {
      expect(subtract(-5, -10)).to.eq(5);
    });
  });

  context("Multiply function", () => {
    it("multiplies successfully 2 numbers", () => {
      expect(multiply(2, 3)).to.eq(6);
    });

    it("multiplies successfully per 0", () => {
      expect(multiply(5, 0)).to.eq(0);
    });
  });

  context("Divide function", () => {
    it("divides successfully 2 numbers", () => {
      expect(divide(6, 3)).to.eq(2);
    });
    it("divides succesfully per 0", () => {
      expect(divide(8, 0)).to.eq(Infinity);
    });
  });

  context("Power function", () => {
    it("powers successfully the first number with the second one", () => {
      expect(power(6, 3)).to.eq(216);
    });

    it("powers succesfully the number with 0", () => {
      expect(power(6, 0)).to.eq(1);
    });

    it("powers succesfully o with the second number", () => {
      expect(power(0, 7)).to.eq(0);
    });
  });

  context("Square root function", () => {
    it("square root of a positive number is successfull", () => {
      expect(squareRoot(4)).to.eq(2);
    });

    it("square root of a positive number is successfull", () => {
      expect(squareRoot(-4)).to.eq();
    });
  });
});
