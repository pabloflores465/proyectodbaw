import { useContext } from "react";

import FeaturedProducts from "../components/FeaturedProducts";
import Products from "./Products";
import { EditModeContext } from "../context/EditModeContext";

function CategoryPage() {
  const { editMode } = useContext(EditModeContext);

  return (
    <>
      {editMode === false ? (
        <FeaturedProducts/>
      ) : (
        <div style={{ marginTop: "60px" }} />
      )}
      <Products />
    </>
  );
}

export default CategoryPage;
