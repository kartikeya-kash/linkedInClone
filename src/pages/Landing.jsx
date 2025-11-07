import { useNavigate } from "react-router-dom";

function Landing() {
  const navigate = useNavigate();
  return (
    <>
      <h1>Landing Page</h1>
      <button style={{ marginTop: "10px" }} onClick={() => navigate("/signup")}>
        Lets get started
      </button>
    </>
  );
}

export default Landing;
