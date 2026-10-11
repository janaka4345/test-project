import { useEffect, useState } from "react";

type ProductData = {
  id: number;
  title: string;
  description: string;
  price: number;
  thumbnail: string;
};

function Product() {
  const [product, setProduct] = useState<ProductData | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch("/dummyjson/products/1")
      .then((res) => {
        if (!res.ok) throw new Error(`Request failed: ${res.status}`);
        return res.json();
      })
      .then(setProduct)
      .catch((err: Error) => setError(err.message));
  }, []);

  if (error) return <p>{error}</p>;
  if (!product) return <p>Loading product...</p>;

  return (
    <section>
      <h2>{product.title}</h2>
      <img src={product.thumbnail} alt={product.title} width={200} />
      <p>{product.description}</p>
      <p>${product.price.toFixed(2)}</p>
    </section>
  );
}

export default Product;
