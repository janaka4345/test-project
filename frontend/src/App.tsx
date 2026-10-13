import { useEffect, useState } from "react";
import type { AppConfig } from "./config";

type Item = {
  id: number;
  name: string;
  price: number;
};

type ItemsResponse = {
  env: string;
  message: string;
  items: Item[];
};

function App({ config }: { config: AppConfig }) {
  const [data, setData] = useState<ItemsResponse | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch("/api/items")
      .then((res) => {
        if (!res.ok) throw new Error(`Request failed: ${res.status}`);
        return res.json();
      })
      .then(setData)
      .catch((err: Error) => setError(err.message));
  }, []);

  return (
    <main>
      <h1>Items</h1>
      <p>Frontend env: {config.appEnv}</p>
      {data && (
        <p>
          Backend env: {data.env} - {data.message}
        </p>
      )}
      {error && <p>{error}</p>}
      <ul>
        {data?.items.map((item) => (
          <li key={item.id}>
            {item.name} - ${item.price.toFixed(2)}
          </li>
        ))}
      </ul>
    </main>
  );
}

export default App;
