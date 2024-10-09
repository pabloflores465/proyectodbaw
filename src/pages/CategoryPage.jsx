import { useContext } from "react";
import { EditProductContext } from "../App";
import FeaturedProducts from "../components/FeaturedProducts";
import Products from "./Products";

function CategoryPage() {
  const { editProduct } = useContext(EditProductContext);

  return (
    <div style={{ backgroundColor: "#fcf3f4", marginTop: "60px" }}>
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