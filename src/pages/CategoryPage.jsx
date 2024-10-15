import { useContext } from "react";

import FeaturedProducts from "../components/FeaturedProducts";
import Products from "./Products";
import { EditModeContext } from "../context/EditModeContext";

function CategoryPage() {
  const { editMode } = useContext(EditModeContext);

  return (
    <div style={{ marginTop: "60px" }}>
      {editMode === false ? (
        <FeaturedProducts />
      ) : (
        <div style={{ marginTop: "60px" }} />
      )}
      <Products/>
    </div>
  );
}

export default CategoryPage;