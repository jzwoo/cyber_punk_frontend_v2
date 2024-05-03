const getProducts = async () => {
  // no cache for get products
  const res = await fetch("http://localhost:8000/api/v1/products", {
    cache: "no-store",
  })

  if (!res.ok) {
    throw new Error("Failed to fetch data")
  }

  return res.json()
}

export default getProducts
