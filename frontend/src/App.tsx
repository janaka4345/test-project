import { useEffect, useState } from "react";

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

function App() {
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
      <p>Frontend env: {import.meta.env.VITE_APP_ENV}</p>
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
