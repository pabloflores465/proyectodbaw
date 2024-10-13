import { useContext } from "react";

import FeaturedProducts from "../components/FeaturedProducts";
import Products from "./Products";
import { EditProductContext } from "../context/EditProductContext";

function CategoryPage() {
  const { editProduct } = useContext(EditProductContext);

  return (
    <div style={{ marginTop: "60px" }}>
      {editProduct === false ? (
        <FeaturedProducts />
      ) : (
        <div style={{ marginTop: "60px" }} />
      )}
      <Products/>
    </div>
  );
}

export default CategoryPage;