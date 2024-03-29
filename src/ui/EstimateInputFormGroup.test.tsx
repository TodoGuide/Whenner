import React from "react";
import { render } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import EstimateInputFormGroup from "./EstimateInputFormGroup";
import { oneHourTask } from "../test/data";

describe("The EstimateInputFormGroup component", () => {
  it("Renders a task estimate", () => {
    const { getByRole } = render(
      <EstimateInputFormGroup estimatedItem={oneHourTask} />
    );
    expect(getByRole("textbox")).toHaveValue(oneHourTask.estimate.toString());
  });
});
