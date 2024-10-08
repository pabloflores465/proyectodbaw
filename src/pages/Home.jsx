import { useLocation, useParams } from "react-router";
import LandingPage from "./LandingPage";
import CategoryPage from "./CategoryPage";

function Home() {
  const params = useParams()
  const location = useLocation()

  return (
    <>
    {location.pathname === '/' ? <LandingPage/>:null}
    {location.pathname === '/:undefined' ? <LandingPage/>:null}
    {location.pathname === `/${params.category}` ? <CategoryPage/>:null}
    </>
  );
}

export default Home;