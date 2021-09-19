// Licensed under GPL v3: https://www.gnu.org/licenses/gpl-3.0.txt
// Copyright © 2021 James Tharpe

import { pastAppointment } from "../test/data";
import { closed } from "../attribs/closable";

describe("The Event Module", () => {
  describe("Given a task", () => {
    // ...
  });

  describe("Given an appointment", () => {
    describe("That is ended (the end date is in the past)", () => {
      const endedAppointment = { ...pastAppointment };

      it("When closed is called, it returns the appointment end date", () => {
        expect(closed(endedAppointment)).toEqual(endedAppointment.end);
      });
    });
  });
});
