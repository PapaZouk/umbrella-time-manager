import { render, screen } from "@testing-library/react";
import { useMonthDays } from "../../../../features/hooks/useMonthDays";
import React, { useEffect } from "react";

const TestComponent = ({ selectedMonth }) => {
 const days = useMonthDays(selectedMonth);

 return <div data-testid="days">{days.join(", ")}</div>;
};

describe("useMonthDays", () => {
 test("should return correct number of days for the selected month", () => {
  render(<TestComponent selectedMonth="2024-02" />);

  const daysDiv = screen.getByTestId("days");
  expect(daysDiv.textContent).toBe(
   [...Array(29)].map((_, i) => i + 1).join(", ")
  );
 });

 test("should update days when the month changes", () => {
  const { rerender } = render(<TestComponent selectedMonth="2024-01" />);

  let daysDiv = screen.getByTestId("days");
  expect(daysDiv.textContent).toBe(
   [...Array(31)].map((_, i) => i + 1).join(", ")
  );

  rerender(<TestComponent selectedMonth="2024-02" />);
  daysDiv = screen.getByTestId("days");
  expect(daysDiv.textContent).toBe(
   [...Array(29)].map((_, i) => i + 1).join(", ")
  );
 });

 test("should return an empty array when selectedMonth is null", () => {
  render(<TestComponent selectedMonth={null} />);

  const daysDiv = screen.getByTestId("days");

  expect(daysDiv.textContent).toBe("");
 });
});
