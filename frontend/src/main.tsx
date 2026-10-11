import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { loadConfig } from "./config.ts";

const root = createRoot(document.getElementById("root")!);

loadConfig()
  .then((config) => {
    root.render(
      <StrictMode>
        <App config={config} />
      </StrictMode>,
    );
  })
  .catch((err: Error) => {
    root.render(<p>{err.message}</p>);
  });
