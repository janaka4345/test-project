import "@testing-library/jest-dom/vitest";
import { render, screen } from "@testing-library/react";
import { afterEach, expect, test, vi } from "vitest";
import App from "./App";

afterEach(() => {
  vi.unstubAllGlobals();
});

test("renders items returned by the API", async () => {
  vi.stubGlobal(
    "fetch",
    vi.fn().mockResolvedValue({
      ok: true,
      json: async () => ({
        env: "test",
        message: "Hello from test",
        items: [{ id: 1, name: "Test Item", price: 9.99 }],
      }),
    }),
  );

  render(<App />);

  expect(await screen.findByText("Test Item - $9.99")).toBeInTheDocument();
  expect(
    screen.getByText("Backend env: test - Hello from test"),
  ).toBeInTheDocument();
  expect(fetch).toHaveBeenCalledWith("/api/items");
});
