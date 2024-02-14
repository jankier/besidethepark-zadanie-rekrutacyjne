import "@testing-library/jest-dom/vitest";
import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import Footer from "../Footer.tsx";

describe("Footer", () => {
  it("render footer component", async () => {
    render(<Footer />, { wrapper: BrowserRouter });
    expect(screen.getByText("LOREM IPSUM ©2021"));
    screen.debug();
  });
});
