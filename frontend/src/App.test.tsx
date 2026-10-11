import "@testing-library/jest-dom/vitest";
import { render, screen } from "@testing-library/react";
import { afterEach, expect, test, vi } from "vitest";
import App from "./App";

afterEach(() => {
  vi.unstubAllGlobals();
});

test("renders items returned by the API", async () => {
  const responses: Record<string, unknown> = {
    "/api/items": {
      env: "test",
      message: "Hello from test",
      items: [{ id: 1, name: "Test Item", price: 9.99 }],
    },
    "/dummyjson/products/1": {
      id: 1,
      title: "Test Product",
      description: "A product for tests",
      price: 4.5,
      thumbnail: "https://example.com/thumb.png",
    },
  };
  vi.stubGlobal(
    "fetch",
    vi.fn((url: string) =>
      Promise.resolve({ ok: true, json: async () => responses[url] }),
    ),
  );

  render(<App config={{ appEnv: "test" }} />);

  expect(await screen.findByText("Test Item - $9.99")).toBeInTheDocument();
  expect(
    screen.getByText("Backend env: test - Hello from test"),
  ).toBeInTheDocument();
  expect(fetch).toHaveBeenCalledWith("/api/items");
  expect(await screen.findByText("Test Product")).toBeInTheDocument();
  expect(fetch).toHaveBeenCalledWith("/dummyjson/products/1");
});
