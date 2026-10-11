import "@testing-library/jest-dom/vitest";
import { render, screen } from "@testing-library/react";
import { http, HttpResponse } from "msw";
import { setupServer } from "msw/node";
import { afterAll, afterEach, beforeAll, expect, test } from "vitest";
import App from "./App";

const server = setupServer(
  http.get("*/api/items", () =>
    HttpResponse.json({
      env: "test",
      message: "Hello from test",
      items: [{ id: 1, name: "Test Item", price: 9.99 }],
    }),
  ),
  http.get("*/dummyjson/products/1", () =>
    HttpResponse.json({
      id: 1,
      title: "Test Product",
      description: "A product for tests",
      price: 4.5,
      thumbnail: "https://example.com/thumb.png",
    }),
  ),
);

beforeAll(() => server.listen({ onUnhandledRequest: "error" }));
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

test("loads and displays items over HTTP", async () => {
  render(<App config={{ appEnv: "test" }} />);

  expect(await screen.findByText("Test Item - $9.99")).toBeInTheDocument();
  expect(await screen.findByText("Test Product")).toBeInTheDocument();
});
