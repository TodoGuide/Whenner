import Cancelable, { isCancelable } from "./cancelable";
import Time from "../time";

describe("The Cancelable Module", () => {
  describe("Given a Cancelable object that has not been canceled", () => {
    const cancelable: Cancelable = { canceled: null };
    it("When isCancelable is called, it returns false", () => {
      expect(isCancelable(cancelable)).toBe(false);
    });
  });

  describe("Given a Cancelable object that has been canceled", () => {
    const cancelable: Cancelable = { canceled: Time.current() };
    it("When isCancelable is called, it returns true", () => {
      expect(isCancelable(cancelable)).toBe(true);
    });
  });

  describe("Given an object that is not cancelable but has a `canceled` property", () => {
    const cancelable = { canceled: "Hello" };
    it("When isCancelable is called, it returns false", () => {
      expect(isCancelable(cancelable)).toBe(false);
    });
  });
});
