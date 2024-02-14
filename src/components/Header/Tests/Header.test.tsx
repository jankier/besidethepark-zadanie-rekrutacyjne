import "@testing-library/jest-dom/vitest";
import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import Header from "../Header.tsx";

describe("Header", () => {
  it("render header component", async () => {
    render(<Header />, { wrapper: BrowserRouter });
    expect(screen.getByText("LOREM IPSUM"));
    screen.debug();
  });
});
