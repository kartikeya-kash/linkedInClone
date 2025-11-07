import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Home() {
  const navigate = useNavigate();

  useEffect(() => {
    if (
      localStorage.getItem("isAuthenticated") === "false" ||
      !localStorage.getItem("isAuthenticated")
    ) {
      alert("Please login to continue");
      navigate("/login");
    }
  }, []);
  return (
    <>
      <h1>Home page feed page</h1>
    </>
  );
}
export default Home;
